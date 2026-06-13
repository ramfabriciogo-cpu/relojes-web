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
    canvas.getContext('webgl') && canvas.getContext('webgl').getExtension('WEBGL_lose_context')?.loseContext();
  }

  const W = canvas.clientWidth;
  const H = canvas.clientHeight;

  visorScene = new THREE.Scene();
  visorScene.background = new THREE.Color(0x0a0a0f);

  visorCamera = new THREE.PerspectiveCamera(40, W / H, 0.01, 1000);
  visorCamera.position.set(0, 0.1, 0.4);

  visorRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  visorRenderer.setPixelRatio(window.devicePixelRatio);
  visorRenderer.setSize(W, H);
  visorRenderer.outputEncoding = THREE.sRGBEncoding;
  visorRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  visorRenderer.toneMappingExposure = 1.2;

  const amb = new THREE.AmbientLight(0xffffff, 0.6);
  visorScene.add(amb);

  const dir1 = new THREE.DirectionalLight(0xfff5e0, 2.0);
  dir1.position.set(3, 5, 3);
  visorScene.add(dir1);

  const dir2 = new THREE.DirectionalLight(0xd0e8ff, 0.8);
  dir2.position.set(-3, 2, -2);
  visorScene.add(dir2);

  const point = new THREE.PointLight(0xffffff, 0.5, 10);
  point.position.set(0, 3, 1);
  visorScene.add(point);

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