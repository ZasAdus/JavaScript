console.error('works');

vertexShaderTxt = `
precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`
const fragmentShaderTxt = `
precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`


const Triangle = function () {
    const canvas = document.getElementById('main-canvas');
    const gl = canvas.getContext('webgl');
    let canvasColor = [0.2, 0.7, 0.5];

    checkGl(gl);

    gl.clearColor(...canvasColor, 1.0);  // R,G,B, A 
    gl.clear(gl.COLOR_BUFFER_BIT);

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
    
    let traingleVerts1 = [
    //  X,    Y
        -0.5, 0,             0.25, 0.88, 0.82,
		0, 0,               0.6, 0.2, 0.8,
		-0.25, 0.43,       1, 1, 0.4
    ]

    const triangleVertBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts1), gl.STATIC_DRAW);

    const posAttrLoc = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        posAttrLoc,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.enableVertexAttribArray(posAttrLoc);

    const colorAttrLoc = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        colorAttrLoc,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(colorAttrLoc);
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    ///////////////////////////////////////////////////////////////////////////////
    
    let traingleVerts2 = [
    //  X,    Y
        -0.25, 0.43,   1, 1, 0.4,
        0.25, 0.43,    0.25, 0.88, 0.82,
        0, 0,          0.6, 0.2, 0.8,
    ]
    const triangleVertBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts2), gl.STATIC_DRAW);

    const posAttrLoc2 = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        posAttrLoc2,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.enableVertexAttribArray(posAttrLoc2);

    const colorAttrLoc2 = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        colorAttrLoc2,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(colorAttrLoc2);
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    ////////////////////////////////////////////////////////////////////////////////
    
    let traingleVerts3 = [
        //  X,    Y
            0, 0,               0.6, 0.2, 0.8,
            0.25, 0.43,         0.25, 0.88, 0.82,
            0.5, 0,             1, 1, 0.4
        ]
        const triangleVertBuffer3 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer3);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts3), gl.STATIC_DRAW);
    
        gl.vertexAttribPointer(
            posAttrLoc,
            2,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
    
        gl.enableVertexAttribArray(posAttrLoc);
    
        gl.vertexAttribPointer(
            colorAttrLoc,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
    
        gl.enableVertexAttribArray(colorAttrLoc);
        
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

    ////////////////////////////////////////////////////////////////////////////////
    
    let traingleVerts4 = [
        //  X,    Y
            -0.5, 0,        0.25, 0.88, 0.82,
            0, 0,           0.6, 0.2, 0.8,
            -0.25, -0.43,   1, 1, 0.4
        ]
        const triangleVertBuffer4 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer4);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts4), gl.STATIC_DRAW);
        
        const posAttrLoc4 = gl.getAttribLocation(program, 'vertPosition');
        gl.vertexAttribPointer(
            posAttrLoc4,
            2,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
    
        gl.enableVertexAttribArray(posAttrLoc4);
    
        const colorAttrLoc4 = gl.getAttribLocation(program, 'vertColor');
        gl.vertexAttribPointer(
            colorAttrLoc4,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
    
        gl.enableVertexAttribArray(colorAttrLoc4);
    
    
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);  

    ////////////////////////////////////////////////////////////////////////////////
    
    let traingleVerts5 = [
        //  X,    Y
            0, 0,                   0.6, 0.2, 0.8,
            -0.25, -0.43,           1, 1, 0.4,
            0.25, -0.43,            0.25, 0.88, 0.82,
        ]
        const triangleVertBuffer5 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer5);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts5), gl.STATIC_DRAW);
        
        const posAttrLoc5 = gl.getAttribLocation(program, 'vertPosition');
        gl.vertexAttribPointer(
            posAttrLoc5,
            2,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
    
        gl.enableVertexAttribArray(posAttrLoc5);
    
        const colorAttrLoc5 = gl.getAttribLocation(program, 'vertColor');
        gl.vertexAttribPointer(
            colorAttrLoc5,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
    
        gl.enableVertexAttribArray(colorAttrLoc5);
    
    
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);  
    
    ////////////////////////////////////////////////////////////////////////////////
    
    let traingleVerts6 = [
        //  X,    Y
            0, 0,              0.6, 0.2, 0.8,
            0.25, -0.43,       0.25, 0.88, 0.82,
            0.5, 0,            1, 1, 0.4
        ]
        const triangleVertBuffer6 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer6);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(traingleVerts6), gl.STATIC_DRAW);
        
        const posAttrLoc6 = gl.getAttribLocation(program, 'vertPosition');
        gl.vertexAttribPointer(
            posAttrLoc6,
            2,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
    
        gl.enableVertexAttribArray(posAttrLoc6);
    
        const colorAttrLoc6 = gl.getAttribLocation(program, 'vertColor');
        gl.vertexAttribPointer(
            colorAttrLoc6,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );
    
        gl.enableVertexAttribArray(colorAttrLoc6);
    
    
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);  
    

    

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