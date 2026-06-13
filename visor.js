let visorRenderer, visorScene, visorCamera, visorControls, visorAnimId;

function iniciarVisor(rutaModelo, nombreReloj) {
  const overlay = document.getElementById('visorOverlay');
  const titulo = document.getElementById('visorTitulo');
  const canvas = document.getElementById('visorCanvas');

  titulo.textContent = nombreReloj;
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';

  if (visorRenderer) {
    cancelAnimationFrame(visorAnimId);
    visorRenderer.dispose();
  }

  const W = canvas.clientWidth;
  const H = canvas.clientHeight;

  visorScene = new THREE.Scene();
  visorScene.background = new THREE.Color(0x2a2a2a);

  visorCamera = new THREE.PerspectiveCamera(40, W / H, 0.01, 1000);
  visorCamera.position.set(0, 0.1, 0.4);

  visorRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  visorRenderer.setPixelRatio(window.devicePixelRatio);
  visorRenderer.setSize(W, H);
  visorRenderer.outputEncoding = THREE.sRGBEncoding;
  visorRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  visorRenderer.toneMappingExposure = 1.0;
  visorRenderer.shadowMap.enabled = true;

  // Luz ambiental fuerte — base de iluminación
  const amb = new THREE.AmbientLight(0xfff5e8, 1.2);
  visorScene.add(amb);

  // Luz principal frontal — ilumina la esfera del reloj
  const front = new THREE.DirectionalLight(0xffffff, 1.8);
  front.position.set(0, 2, 4);
  visorScene.add(front);

  // Luz superior cálida — simula luz de vitrina
  const top = new THREE.DirectionalLight(0xfff0d0, 2.0);
  top.position.set(0, 5, 1);
  visorScene.add(top);

  // Luz lateral izquierda — rellena sombras
  const left = new THREE.DirectionalLight(0xffeedd, 1.5);
  left.position.set(-4, 2, 2);
  visorScene.add(left);

  // Luz lateral derecha — rellena sombras
  const right = new THREE.DirectionalLight(0xffeedd, 1.5);
  right.position.set(4, 2, 2);
  visorScene.add(right);

  // Luz trasera — da profundidad al metal
  const back = new THREE.DirectionalLight(0xfff5e0, 1.0);
  back.position.set(0, 1, -4);
  visorScene.add(back);

  // Luz puntual inferior — ilumina la correa
  const bottom = new THREE.PointLight(0xfff5e8, 1.5, 10);
  bottom.position.set(0, -3, 2);
  visorScene.add(bottom);

  visorControls = new THREE.OrbitControls(visorCamera, canvas);
  visorControls.enableDamping = true;
  visorControls.dampingFactor = 0.08;
  visorControls.minDistance = 0.1;
  visorControls.maxDistance = 2;
  visorControls.target.set(0, 0, 0);

  const loadingEl = document.getElementById('visorLoading');
  loadingEl.style.display = 'flex';

  const loader = new THREE.GLTFLoader();
  loader.load(
    rutaModelo,
    (gltf) => {
      loadingEl.style.display = 'none';

      const model = gltf.scene;

      // Mejorar materiales del modelo para mejor visibilidad
      model.traverse((node) => {
        if (node.isMesh && node.material) {
          const mats = Array.isArray(node.material) ? node.material : [node.material];
          mats.forEach(mat => {
  if (mat.metalness !== undefined) {
    mat.metalness = 0.3;
    mat.roughness = 0.4;
  }
  mat.needsUpdate = true;
});
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 0.25 / maxDim;

      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));

      visorScene.add(model);

      visorCamera.position.set(0, 0.05, 0.35);
      visorControls.update();

      function animar() {
        visorAnimId = requestAnimationFrame(animar);
        visorControls.update();
        visorRenderer.render(visorScene, visorCamera);
      }
      animar();
    },
    (progress) => {
      if (progress.total > 0) {
        const pct = Math.round((progress.loaded / progress.total) * 100);
        document.getElementById('visorPct').textContent = pct + '%';
      }
    },
    (error) => {
      loadingEl.style.display = 'none';
      console.error('Error cargando modelo:', error);
      document.getElementById('visorError').style.display = 'block';
    }
  );
}

function cerrarVisor() {
  const overlay = document.getElementById('visorOverlay');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  if (visorAnimId) cancelAnimationFrame(visorAnimId);
  if (visorRenderer) {
    visorRenderer.dispose();
    visorRenderer = null;
  }
}