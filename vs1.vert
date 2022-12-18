attribute vec3  position;
attribute vec4  color;
attribute vec2  texCoord;
uniform   mat4  mvpMatrix;
varying   vec4  vColor;
varying   vec2  vTexCoord;

void main() {
  // varying 変数を設定
  vColor = color;
  vTexCoord = texCoord;
  // 行列と頂点座標を乗算
  gl_Position = vec4(position, 1.0);
}
