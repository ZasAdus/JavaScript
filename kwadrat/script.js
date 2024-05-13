console.error('works');

const vertexShaderTxt = `
precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

const fragmentShaderTxt = `
precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`;

const Triangle = function () {
    const canvas = document.getElementById('main-canvas');
    const gl = canvas.getContext('webgl');
    let canvasColor = [0.2, 0.7, 0.5];

    checkGl(gl);

    gl.clearColor(...canvasColor, 1.0);  // R,G,B, A 
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = createAndCompileShader(gl, gl.VERTEX_SHADER, vertexShaderTxt);
    const fragmentShader = createAndCompileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderTxt);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posAttrLoc = gl.getAttribLocation(program, 'vertPosition');
    const colorAttrLoc = gl.getAttribLocation(program, 'vertColor');

    for (let i = 1; i <= 2; i++) {
        const triangleVerts = getTriangleVertices(i);
        const triangleVertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerts), gl.STATIC_DRAW);
        
        gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(posAttrLoc);
        
        gl.vertexAttribPointer(colorAttrLoc, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(colorAttrLoc);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
};

function createAndCompileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    checkShaderCompile(gl, shader);
    return shader;
}

function getTriangleVertices(index) {
    switch (index) {
        case 1:
            return [-0.5, 0.5, 1, 1, 0.4,0.5, 0.5, 0.6, 0.2, 0.8, 0.5, -0.5, 0.25, 0.88, 0.82,];
        case 2:
            return [0.5, -0.5, 0.25, 0.88, 0.82,-0.5, -0.5, 0.6, 0.2, 0.8, -0.5, 0.5, 1, 1, 0.4];
        case deafult:
            return [];
    }
}

function checkGl(gl) {
    if (!gl) { console.log('WebGL not supported, use another browser'); }
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

Triangle();