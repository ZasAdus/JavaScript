const vertexShaderTxt = `
precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

attribute vec3 vertPosition;
attribute vec2 textureCoord;
attribute vec3 vertNormal;

varying vec2 fragTextureCoord;
varying vec3 fragNormal;

void main() {
    fragTextureCoord = textureCoord;
    fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;
    gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.0);
}
`;
const fragmentShaderTxt = `
precision mediump float;

varying vec2 fragTextureCoord;
varying vec3 fragNormal;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightColor;

uniform sampler2D sampler;

void main() {
    vec3 normLightDirection = normalize(lightDirection);
    vec3 normFragNormal = normalize(fragNormal);

    vec3 light = ambientLight + 
    lightColor * max(dot(normFragNormal, normLightDirection), 0.0);

    vec4 tex = texture2D(sampler, fragTextureCoord);
    gl_FragColor = vec4(tex.rgb * light, tex.a);
}
`;

const mat4 = glMatrix.mat4;
let cameraPosition = [0, -2, -5];
let cameraTarget = [0, 0, 0];

function updateViewMatrix(viewMatrix) {
    mat4.lookAt(viewMatrix, cameraPosition, cameraTarget, [0, 1, 0]);
}

function moveCamera(event) {
    const key = event.key;
    const cameraSpeed = 0.2;

    if (key === 'ArrowUp') {
        cameraPosition[2] += cameraSpeed; 
    }
    if (key === 'ArrowDown') {
        cameraPosition[2] -= cameraSpeed; 
    }
    if (key === 'ArrowRight') {
        cameraPosition[0] += cameraSpeed; 
    }
    if (key === 'ArrowLeft') {
        cameraPosition[0] -= cameraSpeed; 
    }
}

function startDraw() {
    OBJ.downloadMeshes({
        'sphere': 'monkey.obj'
    }, Triangle);
}

const Triangle = function (meshes) {
    const canvas = document.getElementById('main-canvas');
    const gl = canvas.getContext('webgl');
    let canvasColor = [0.2, 0.7, 0.5];

    checkGl(gl);

    gl.clearColor(...canvasColor, 1.0);  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);

    gl.validateProgram(program);

    OBJ.initMeshBuffers(gl, meshes.sphere);

    gl.bindBuffer(gl.ARRAY_BUFFER, meshes.sphere.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshes.sphere.indexBuffer);
    
    const posAttrLoc = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        posAttrLoc,
        meshes.sphere.vertexBuffer.itemSize,
        gl.FLOAT,
        gl.FALSE,
        0,
        0
    );
    gl.enableVertexAttribArray(posAttrLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, meshes.sphere.textureBuffer);
    const textureAttrLoc = gl.getAttribLocation(program, 'textureCoord');
    gl.vertexAttribPointer(
        textureAttrLoc,
        meshes.sphere.textureBuffer.itemSize,
        gl.FLOAT,
        gl.FALSE,
        0,
        0
    );
    gl.enableVertexAttribArray(textureAttrLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, meshes.sphere.normalBuffer);
    const normalAttrLoc = gl.getAttribLocation(program, 'vertNormal');
    gl.vertexAttribPointer(
        normalAttrLoc,
        meshes.sphere.normalBuffer.itemSize,
        gl.FLOAT,
        gl.TRUE,
        0,
        0
    );
    gl.enableVertexAttribArray(normalAttrLoc);

    const img = document.getElementById('img');
    const boxTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
        gl.TEXTURE_2D, 
        0,      
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
    );
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.useProgram(program);

    const worldMatLoc = gl.getUniformLocation(program, 'mWorld');
    const viewMatLoc = gl.getUniformLocation(program, 'mView');
    const projMatLoc = gl.getUniformLocation(program, 'mProjection');

    const worldMatrix = mat4.create();
    const viewMatrix = mat4.create();
    const projectionMatrix = mat4.create();
    
    updateViewMatrix(viewMatrix);
    mat4.perspective(projectionMatrix, glMatrix.glMatrix.toRadian(90), 
                canvas.width / canvas.height, 0.1, 1000.0);

    gl.uniformMatrix4fv(worldMatLoc, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(viewMatLoc, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(projMatLoc, gl.FALSE, projectionMatrix);

    const ambientUniformLoc = gl.getUniformLocation(program, 'ambientLight');
    const lightDirUniformLoc = gl.getUniformLocation(program, 'lightDirection');
    const lightColorUniformLoc = gl.getUniformLocation(program, 'lightColor');
    const ambient_light = [0.2, 0.2, 0.2];
    gl.uniform3f(ambientUniformLoc, ...ambient_light);
    const light_dir = [1, 2, -2];
    gl.uniform3f(lightDirUniformLoc, ...light_dir);
    const light_color = [0.6, 0.5, 0.3];
    gl.uniform3f(lightColorUniformLoc, ...light_color);

    const identityMat = mat4.create();
    const loop = function () {
        const angle = performance.now() / 1000 / 60 * 60 * Math.PI;
        mat4.rotate(worldMatrix, identityMat, angle, [0, 1, -0.5]);
        gl.uniformMatrix4fv(worldMatLoc, gl.FALSE, worldMatrix);
        
        updateViewMatrix(viewMatrix);
        gl.uniformMatrix4fv(viewMatLoc, gl.FALSE, viewMatrix);

        gl.clearColor(...canvasColor, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, boxTexture);
        gl.activeTexture(gl.TEXTURE0);   

        gl.drawElements(gl.TRIANGLES, meshes.sphere.indexBuffer.numItems, 
                gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

function checkGl(gl) {
    if (!gl) {console.log('WebGL not supported, use another browser');}
}

function checkShaderCompile(gl, shader) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('shader not compiled', gl.getShaderInfoLog(shader));
    }
}

function checkLink(gl, program) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    }
}

document.addEventListener('keydown', moveCamera);
startDraw();