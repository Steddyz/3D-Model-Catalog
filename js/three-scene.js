function setupLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);
}

function createVaseModel() {
    const group = new THREE.Group();
    const vaseGeometry = new THREE.ConeGeometry(0.8, 2, 32);
    const vaseMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4a017,
        metalness: 0.7,
        roughness: 0.3
    });
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    group.add(vase);
    
    const handleGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
    const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0xb8860b,
        metalness: 0.8,
        roughness: 0.2
    });
    
    for (let i = 0; i < 2; i++) {
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.x = i === 0 ? -0.9 : 0.9;
        handle.position.y = 0.5;
        handle.rotation.z = Math.PI / 2;
        group.add(handle);
    }
    
    for (let i = 0; i < 8; i++) {
        const ornamentGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const ornamentMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            metalness: 0.9,
            roughness: 0.1
        });
        const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
        
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.85;
        ornament.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * 0.5 - 0.5,
            Math.sin(angle) * radius
        );
        group.add(ornament);
    }
    
    return group;
}

function createRobotModel() {
    const group = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.8);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        metalness: 0.8,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c3e50,
        metalness: 0.9,
        roughness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    group.add(head);
    
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
    const armMaterial = new THREE.MeshStandardMaterial({
        color: 0xe74c3c,
        metalness: 0.7,
        roughness: 0.3
    });
    
    for (let i = 0; i < 2; i++) {
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.position.x = i === 0 ? -0.8 : 0.8;
        arm.position.y = 0.5;
        arm.rotation.z = i === 0 ? -0.3 : 0.3;
        group.add(arm);
    }
    
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 8);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c3e50,
        metalness: 0.8,
        roughness: 0.2
    });
    
    for (let i = 0; i < 2; i++) {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.x = i === 0 ? -0.3 : 0.3;
        leg.position.y = -1.3;
        group.add(leg);
    }
    
    return group;
}

function createBuildingModel() {
    const group = new THREE.Group();
    const buildingGeometry = new THREE.BoxGeometry(2, 3, 1.5);
    const buildingMaterial = new THREE.MeshStandardMaterial({
        color: 0x95a5a6,
        metalness: 0.3,
        roughness: 0.7
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    group.add(building);
    
    const windowGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.05);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x113355,
        emissiveIntensity: 0.3
    });
    
    for (let floor = 0; floor < 5; floor++) {
        for (let side = 0; side < 4; side++) {
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.y = floor * 0.5 - 1;
            window.position.x = side < 2 ? (side === 0 ? -0.7 : 0.7) : 0;
            window.position.z = side >= 2 ? (side === 2 ? -0.6 : 0.6) : 0;
            group.add(window);
        }
    }
    
    const roofGeometry = new THREE.ConeGeometry(1.2, 0.8, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0392b,
        metalness: 0.5,
        roughness: 0.5
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.9;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
    
    return group;
}

function createSpaceshipModel() {
    const group = new THREE.Group();
    const hullGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    const hullMaterial = new THREE.MeshStandardMaterial({
        color: 0x2980b9,
        metalness: 0.9,
        roughness: 0.1
    });
    const hull = new THREE.Mesh(hullGeometry, hullMaterial);
    hull.rotation.z = -Math.PI / 2;
    group.add(hull);
    
    const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
    const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x34495e,
        metalness: 0.8,
        roughness: 0.2
    });
    
    for (let i = 0; i < 2; i++) {
        const wing = new THREE.Mesh(wingGeometry, wingMaterial);
        wing.position.x = i === 0 ? -0.8 : 0.8;
        wing.position.y = 0.3;
        group.add(wing);
    }
    
    const engineGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 16);
    const engineMaterial = new THREE.MeshStandardMaterial({
        color: 0xe74c3c,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0xff3300,
        emissiveIntensity: 0.5
    });
    
    for (let i = 0; i < 2; i++) {
        const engine = new THREE.Mesh(engineGeometry, engineMaterial);
        engine.position.y = i === 0 ? -0.5 : -0.2;
        engine.position.z = -0.8;
        group.add(engine);
    }
    
    return group;
}

function createBiomechModel() {
    const group = new THREE.Group();
    const coreGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x27ae60,
        metalness: 0.4,
        roughness: 0.6,
        emissive: 0x0a3d2a,
        emissiveIntensity: 0.3
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);
    
    for (let i = 0; i < 4; i++) {
        const gearGeometry = new THREE.TorusGeometry(0.3 + i * 0.1, 0.05, 8, 24);
        const gearMaterial = new THREE.MeshStandardMaterial({
            color: 0x7f8c8d,
            metalness: 0.9,
            roughness: 0.1
        });
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        gear.rotation.x = Math.PI / 2;
        gear.rotation.z = (i * Math.PI) / 6;
        gear.position.y = 0.2 * i - 0.3;
        group.add(gear);
    }
    
    for (let i = 0; i < 6; i++) {
        const tubeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
        const tubeMaterial = new THREE.MeshStandardMaterial({
            color: 0xf39c12,
            metalness: 0.7,
            roughness: 0.3
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        
        const angle = (i / 6) * Math.PI * 2;
        tube.position.set(
            Math.cos(angle) * 0.6,
            Math.sin(angle) * 0.3,
            Math.sin(angle) * 0.6
        );
        tube.rotation.z = angle;
        group.add(tube);
    }
    
    return group;
}

function createCrystalModel() {
    const group = new THREE.Group();
    const crystalGeometry = new THREE.ConeGeometry(0.5, 2, 6);
    const crystalMaterial = new THREE.MeshStandardMaterial({
        color: 0x9b59b6,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    group.add(crystal);
    
    for (let i = 0; i < 8; i++) {
        const subCrystalGeometry = new THREE.ConeGeometry(0.2, 0.8, 4);
        const subCrystalMaterial = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x3498db : 0xe74c3c,
            metalness: 0.6,
            roughness: 0.3,
            transparent: true,
            opacity: 0.7
        });
        const subCrystal = new THREE.Mesh(subCrystalGeometry, subCrystalMaterial);
        
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.2;
        subCrystal.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 0.3,
            Math.sin(angle) * radius
        );
        subCrystal.rotation.y = angle;
        group.add(subCrystal);
    }
    
    const baseGeometry = new THREE.CylinderGeometry(1.5, 1.2, 0.3, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x34495e,
        metalness: 0.8,
        roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.2;
    group.add(base);
    
    return group;
}

function createSimpleModel() {
    const group = new THREE.Group();
    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x3498db,
        metalness: 0.7,
        roughness: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    group.add(torus);
    
    for (let i = 0; i < 5; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0xe74c3c,
            metalness: 0.8,
            roughness: 0.2
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        const angle = (i / 5) * Math.PI * 2;
        sphere.position.set(
            Math.cos(angle) * 0.6,
            0,
            Math.sin(angle) * 0.6
        );
        group.add(sphere);
    }
    
    return group;
}

function createFallbackModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x3498db,
        metalness: 0.5,
        roughness: 0.5
    });
    return new THREE.Mesh(geometry, material);
}

function createGeometryModel(modelId) {
    if (modelId === 7) {
        return createVaseModel();
    } else if (modelId === 8) {
        return createRobotModel();
    } else if (modelId === 9) {
        return createBuildingModel();
    } else if (modelId === 10) {
        return createSpaceshipModel();
    } else if (modelId === 11) {
        return createBiomechModel();
    } else if (modelId === 12) {
        return createCrystalModel();
    } else {
        return createSimpleModel();
    }
}

function finishModelSetup(model, modelConfig, scene) {
    model.scale.set(
        modelConfig.scale,
        modelConfig.scale,
        modelConfig.scale
    );
    
    model.position.set(
        modelConfig.position.x,
        modelConfig.position.y,
        modelConfig.position.z
    );
    
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            
            if (node.material) {
                node.material.metalness = node.material.metalness || 0.5;
                node.material.roughness = node.material.roughness || 0.5;
                node.material.envMapIntensity = 1.0;
            }
        }
    });
    
    scene.add(model);
}

function centerCamera(camera, controls, model) {
    if (!model) return;
    
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
    
    camera.position.z = cameraZ * 1.5;
    controls.target.copy(center);
    controls.update();
}

function createThreeDScene(containerId, modelConfig) {
    const container = document.getElementById(containerId);
    let scene, camera, renderer, controls, model, mixer;
    const clock = new THREE.Clock();
    
    function init() {
        try {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);
            
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(0, 0, 5);
            
            renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                alpha: true 
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputEncoding = THREE.sRGBEncoding;
            
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
            
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Создание 3D-сцены...';
            container.appendChild(loadingIndicator);
            
            setupLighting(scene);
            
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = true;
            controls.enablePan = false;
            controls.minDistance = 1;
            controls.maxDistance = 10;
            
            if (modelConfig.type === 'geometry' || modelConfig.geometryType === 'complex') {
                loadGeometryModel();
                setTimeout(() => {
                    const indicator = container.querySelector('.loading-indicator');
                    if (indicator) indicator.remove();
                }, 500);
            } else if (modelConfig.type === 'ldraw') {
                loadLDrawModel();
            } else {
                loadGLTFModel();
            }
            
            animate();
            window.addEventListener('resize', onWindowResize);
        } catch (error) {
            console.error('Ошибка инициализации сцены:', error);
            loadFallbackModel();
        }
    }
    
    function loadGLTFModel() {
        const loader = new THREE.GLTFLoader();
        
        const loadTimeout = setTimeout(() => {
            console.warn('Таймаут загрузки модели, создаем геометрию');
            loadGeometryModel();
        }, 15000);
        
        loader.load(
            modelConfig.modelUrl,
            (gltf) => {
                clearTimeout(loadTimeout);
                onModelLoaded(gltf);
            },
            onLoadProgress,
            (error) => {
                clearTimeout(loadTimeout);
                console.warn('Ошибка загрузки GLTF модели, создаем геометрию:', error);
                loadGeometryModel();
            }
        );
    }
    
    function loadLDrawModel() {
        const loader = new THREE.LDrawLoader();
        loader.smoothNormals = true;
        
        const loadTimeout = setTimeout(() => {
            console.warn('Таймаут загрузки LDraw модели, создаем геометрию');
            loadGeometryModel();
        }, 15000);
        
        const backupModel = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/ldraw/officialLibrary/models/car.ldr_Packed.mpd';
        
        loader.load(
            modelConfig.modelUrl,
            (object) => {
                clearTimeout(loadTimeout);
                onLDrawModelLoaded(object);
            },
            onLoadProgress,
            (error) => {
                console.warn('Ошибка загрузки LDraw модели, пробуем резервную:', error);
                loader.load(
                    backupModel,
                    (object) => {
                        clearTimeout(loadTimeout);
                        onLDrawModelLoaded(object);
                    },
                    null,
                    (error2) => {
                        clearTimeout(loadTimeout);
                        console.warn('Ошибка загрузки резервной LDraw модели, создаем геометрию:', error2);
                        loadGeometryModel();
                    }
                );
            }
        );
    }
    
    function loadGeometryModel() {
        const loadingIndicator = container.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        model = createGeometryModel(modelConfig.id);
        finishModelSetup(model, modelConfig, scene);
        centerCamera(camera, controls, model);
    }
    
    function loadFallbackModel() {
        model = createFallbackModel();
        finishModelSetup(model, modelConfig, scene);
        centerCamera(camera, controls, model);
    }
    
    function onLDrawModelLoaded(object) {
        const loadingIndicator = container.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        model = object;
        model.scale.set(0.03, 0.03, 0.03);
        model.rotation.set(Math.PI / 2, 0, 0);
        
        scene.add(model);
        
        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: child.material.color,
                    metalness: 0.2,
                    roughness: 0.8
                });
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        centerCamera(camera, controls, model);
    }
    
    function onModelLoaded(gltf) {
        const loadingIndicator = container.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        model = gltf.scene;
        finishModelSetup(model, modelConfig, scene);
        
        if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }
        
        centerCamera(camera, controls, model);
    }
    
    function onLoadProgress(progress) {
        const loadingIndicator = container.querySelector('.loading-indicator');
        if (loadingIndicator && progress.total) {
            const percent = (progress.loaded / progress.total * 100).toFixed(0);
            loadingIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Загрузка: ${percent}%`;
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        
        if (mixer) {
            mixer.update(delta);
        }
        
        if (model) {
            model.rotation.y += 0.003;
        }
        
        if (controls) {
            controls.update();
        }
        
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }
    
    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    
    function dispose() {
        if (renderer) {
            renderer.dispose();
        }
        
        if (controls) {
            controls.dispose();
        }
    }
    
    function resize() {
        onWindowResize();
    }
    
    function center() {
        centerCamera(camera, controls, model);
    }
    
    init();
    
    return {
        resize,
        center,
        dispose
    };
}