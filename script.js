// Variables pour le personnage, sections, et le conteneur de cartes
const character = document.getElementById('character');
const sections = Array.from(document.querySelectorAll('.section'));
const cardsContainer = document.getElementById('cards-container');

// Définir les positions de chaque section
const sectionPositions = sections.map(section => ({
  id: section.id,
  position: section.offsetLeft,
  width: section.offsetWidth,
  name: section.textContent.trim(), // Le nom de la section pour afficher dans les cartes
}));

// Contenu pour chaque section
const sectionContent = {
  experience: `
    <div class="card" style="height: 30rem;">
        <div class="logo" style="background-image: url('images/logo-hardis.png');"></div> <!-- Logo added dynamically -->
        <h3>Hardis Group</h3>
        <h4>Septembre 2022 - Octobre 2024</h4>
        <p><strong>Software Engineer Apprenticeship</strong></p>
        <ul>
            <li>Designed a carbon emission simulator for new digital project in Excel.</li>
            <li>Developed an automated Landing Zone generator on GCP using Infrastructure as Code (IaC) with Terraform.</li>
            <li>Created practical guides and processes for FinOps and GreenOps to optimize cloud cost management and sustainability efforts.</li>
        </ul>
    </div>
    <div class="card" style="height: 30rem;">
        <div class="logo" style="background-image: url('images/logo-revolv.png');"></div> <!-- Logo added dynamically -->
        <h3>Revolv Space</h3>
        <h4>Mai 2023 - Août 2023</h4>
        <p><strong>Software Engineer Intern</strong></p>
        <ul>
            <li>Designed an IoT system that gathers data from sensors and sends it to a Raspberry Pi using Python.</li>
            <li>Developed two dashboards in Grafana for data visualization, using Prometheus as the time series database.</li>
            <li>Implemented an alert and notification system.</li>
        </ul>
    </div>
    <div class="card" style="height: 30rem;">
        <div class="logo" style="background-image: url('images/logo-kelio.png');"></div> <!-- Logo added dynamically -->
        <h3>Kelio</h3>
        <h4>Septembre 2021 - Août 2022</h4>
        <p><strong>Software Engineer Apprenticeship</strong></p>
        <ul>
            <li>Developed 10 strategies in Java for the calculator of their new access control.</li>
            <li>Improved coverage up to 98% for the calculator by designing and implementing unit and integration tests.</li>
            <li>Worked following Agile best practices.</li>
        </ul>
    </div>
    <div class="card" style="height: 30rem;">
        <div class="logo" style="background-image: url('images/logo-actia.png');"></div> <!-- Logo added dynamically -->
        <h3>Actia Automotive</h3>
        <h4>Juin 2021 - Août 2021</h4>
        <p><strong>Full-Stack Internship</strong></p>
        <ul>
            <li>Analyzed the needs and objectives of the client for an internal website.</li>
            <li>Made wireframe according to the needs with Figma.</li>
            <li>Developed about 20 features for the intern solution in VueJs for the frontend and NodeJS for the backend.</li>
        </ul>
    </div>
  `,
  education: `
    <div class="card">
        <div class="logo" style="background-image: url('images/logo-IMT.png');"></div>
        <h3>Master’s degree in Software Engineering</h3>
        <h4>September 2024</h4>
        <p>IMT Atlantique - Ecole des Mines de Nantes</p>
    </div>
    <div class="card">
        <div class="logo" style="background-image: url('images/logo-iut.png');"></div>
        <h3>Associate’s degree in Computer Science</h3>
        <h4>September 2021</h4>
        <p>University of Toulouse III</p>
    </div>
    <div class="card">
        <div class="logo" style="background-image: url('images/logo-poitiers.png');"></div>
        <h3>Bachelor degree in Mathematics</h3>
        <h4>September 2019</h4>
        <p>University of Poitiers</p>
    </div>
  `,
  projects: `
    <div class="card">
      <h3>AI and Safe City Game</h3>
      <p><strong>Web Application Development</strong></p>
      <p>Created a modern web application using VueJS and Node.js, featuring a responsive interface and advanced functionalities.</p>
    </div>
    <div class="card">
        <h3>Time Series Engine</h3>
        <p><strong>Mathematical Algorithm Implementation</strong></p>
        <p>Developed a pattern recognition engine in Python based on mathematical research in Time Series.</p>
        <a href="https://github.com/mpvz7/TimeSeriesEngine" target="_blank">View Project</a>
    </div>
    <div class="card">
        <h3>Airport Sensor Data Collection</h3>
        <p><strong>Queuing System Management</strong></p>
        <p>Handled data collection from airport sensor simulators using Go and an MQTT broker.</p>
    </div>
    <div class="card">
        <h3>3D Globe Visualization</h3>
        <p><strong>3D Graphics Development</strong></p>
        <p>Built a 3D globe visualization using ThreeJS and React, incorporating interactive features.</p>
        <a href="https://github.com/mpvz7/odyssey" target="_blank">View Project</a>
    </div>
  `,
  hobbies: `
    <div class="card" style="width: fit-content; height: fit-content; padding: 0;">
    <h3>Traveling</h3>
    <p><img alt="Traveling" src="images/map.png" style="height:28rem; background-size: cover; background-position: center;" /></p>
    
</div>


  `
};

// Fonction pour déplacer le personnage vers une position cible
function moveCharacter(targetPosition) {
  const currentLeft = parseInt(character.style.left) || 0;
  const distance = targetPosition - currentLeft;
  let movement = 0;

  // Transition fluide en utilisant requestAnimationFrame
  function slide() {
    if (Math.abs(movement) < Math.abs(distance)) {
      movement += Math.sign(distance) * 5; // Déplacement
      character.style.left = `${currentLeft + movement}px`;
      requestAnimationFrame(slide);
    } else {
      character.style.left = `${targetPosition}px`;
      checkJump(targetPosition);
    }
  }
  slide();
}

// Fonction pour gérer le saut et la mise à jour de l'affichage des cartes
function checkJump(targetPosition) {
  const section = sectionPositions.find((section) => {
    return targetPosition >= section.position && targetPosition <= section.position + section.width;
  });

  if (section) {
    // Mettre à jour les cartes du contenu
    updateCards(section);
  }
}

// Fonction pour mettre à jour les cartes en fonction de la section
function updateCards(section) {
  cardsContainer.innerHTML = sectionContent[section.id] || `
    <div class="card">
      <h3>${section.name}</h3>
      <p>Contenu à venir...</p>
    </div>
  `;
}

// Gérer l'input clavier (flèches directionnelles)
document.addEventListener('keydown', (event) => {
  const currentLeft = parseInt(character.style.left) || 0;

  switch(event.key) {
    case 'ArrowLeft':
      const prevSection = sectionPositions.find(section => section.position < currentLeft);
      if (prevSection) {
        moveCharacter(prevSection.position);
      }
      break;
    case 'ArrowRight':
      const nextSection = sectionPositions.find(section => section.position > currentLeft);
      if (nextSection) {
        moveCharacter(nextSection.position);
      }
      break;
  }
});

// Gérer le clic de la souris sur les sections
sections.forEach((section) => {
  section.addEventListener('click', () => {
    const sectionPosition = sectionPositions.find(position => position.id === section.id);
    moveCharacter(sectionPosition.position);
  });
});
