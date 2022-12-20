precision mediump float;
varying vec2 vTexCoord;

uniform sampler2D textureUnit1;
uniform sampler2D textureUnit2;
uniform sampler2D disp;
uniform float ratio;

void main() {
  vec4 disp = texture2D(disp, vTexCoord);

  vec2 distortedPosition = vec2(vTexCoord.x + ratio * (disp.r * 0.2), vTexCoord.y);
  vec2 distortedPosition2 = vec2(vTexCoord.x - (1.0 - ratio) * (disp.r * 0.2), vTexCoord.y);

  vec4 _texture = texture2D(textureUnit1, distortedPosition);
  vec4 _texture2 = texture2D(textureUnit2, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, ratio);

  gl_FragColor = finalTexture;
}