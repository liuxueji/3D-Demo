var container, stats, controls, camera, scene, renderer, light;

init();
animate();

function init() {
  // 创建实例
  container = document.createElement('div');
  document.body.appendChild(container);
  // 创建相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .2, 1000);
  camera.position.set(0, 0, 15);
  // 创建画布
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // 创建灯光相关的
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.set(12, 13, 12);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // 渲染建模
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, -1000).normalize();
  light.intensity = 0.2; //强度
  scene.add(light);

  var loader = new THREE.FBXLoader();
  loader.load('assets/models/demo10.fbx', function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    object.rotation.y = Math.PI / 2;
    //object.rotation.x = -Math.PI/2 - Math.PI/12;
    object.position.set(0, -0.15, 0.3);
    console.log(object.position);
    object.scale.set(.003, .003, .003);
    scene.add(object);
  });

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();
  window.addEventListener('resize', onWindowResize, false);

  // stats
  stats = new Stats();
  // container.appendChild(stats.dom);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}