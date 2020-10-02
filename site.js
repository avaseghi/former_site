(function() {
  let model = {
    init: function() {
      this.projects = [{
          sprite: {
            source: "./img/resized_aa_sprite.png",
            size:"8100%"
          },
          num : "01",
          title: "AMERICAN AIRLINES",
          description: "In this campaign for American Airlines, users can soar over the skyline of New York, the peak of Mt. Fuji and the dazzling shores of Sydney all with the swipe of a finger.",
          role: "UX Design and Development",
          next: {
            name: "VOLVO",
            index: 1
          },
          frames : 80,
          count: 0
        }, {
          sprite: {
            source: "./img/resized_volvo_sprite.png",
            size:"15600%"
          },
          num : "02",
          title: "VOLVO",
          description: "For this campaign promoting the XC90's newest alertness feature, users play a game to determine their alertness and receive a tailored response based on their score and directions to the nearest coffee shop.",
          role: "UX Design and Development",
          next: {
            name:"MICROSOFT BAND",
            index: 2
          },
          frames : 155,
          count: 0
        }, {
          sprite: {
            source: "./img/resized_microsoft_sprite.png",
            size:"6500%"
          },
          num : "03",
          title: "MICROSOFT BAND",
          description: "To promote Microsoft's latest piece of wearable technology, the Microsoft Band, this campaign allows user's the ability to explore the band's slick design by dragging their finger across the screen to view its different angles while also reading about its many features.",
          role: "UX Design and Development",
          next: {
            name: "KELLOGG'S KRAVE",
            index: 3
          },
          frames : 64,
          count: 0
        }, {
          sprite: {
            source:  "./img/resized_krave_sprite.png",
            size:"5000%"
          },
          num : "04",
          title: "KELLOGG'S KRAVE",
          description: "To encourage brand engagment, this campaign challenges the user to a game of tic-tac-toe all while the colorful antics of a cast of playful characters unfold in the background.",
          role: "UX Design and Development",
          next: {
            name: "AMERICAN AIRLINES",
            index: 0
          },
          frames : 49,
          count: 0
        }];

        this.currentProject = this.projects[0];
    }
  };

  let controller = {
    init: function() {
      model.init();
      projectMenu.init();
      mainView.init();
    },

    getAllProjects: function() {
      return model.projects;
    },

    getCurrentProject: function() {
      return model.currentProject;
    },

    setCurrentProject: function(index = model.currentProject.next.index) {
      model.currentProject = model.projects[index];
      projectMenu.render();
      mainView.clearInterval();
      mainView.render();
    },

    getSpritePos: function(index) {
      if (model.currentProject.count < model.currentProject.frames) {
        let xPos = model.currentProject.count * (100 / model.currentProject.frames);
        mainView.animateBackground(xPos);
        model.currentProject.count ++;
      } else {
        model.currentProject.count = 0;
      }
    }
  };

  let projectMenu = {
    init: function() {
      this.allProjects = controller.getAllProjects();
      let projMenu = document.getElementById("project-menu");
      this.menuItems;

      for (let i = 0; i < this.allProjects.length; i++) {
        let element = document.createElement("div");

        element.innerHTML = this.allProjects[i].num;
        element.className = "inactive-project";

        element.addEventListener('click', (function(index) {
          return function() {
            controller.setCurrentProject(index);
          }
        })(i));

        projMenu.appendChild(element);
      }

      this.menuItems = projMenu.children;
      this.render();
    },

    render: function() {
      let projIndex = this.allProjects.indexOf(controller.getCurrentProject());

      for (let i = 0; i < this.menuItems.length; i++) {
        if (i === projIndex) {
          this.menuItems[i].classList.remove("inactive-project");
          this.menuItems[i].classList.add("active-project");
        } else {
          this.menuItems[i].classList.remove("active-project");
          this.menuItems[i].classList.add("inactive-project");
        }
      }
    }
  };

  let mainView = {
    init: function() {
      let descContainer = document.getElementById("description-container").children[0].children;
      this.interval;
      this.sprite = document.getElementById("ad");
      this.numContainer = descContainer[0];
      this.titleContainer = descContainer[1];
      this.textContainer = descContainer[2];
      this.roleContainer = descContainer[3].children[0];
      this.nextContainer = descContainer[4].children[0];

      this.nextContainer.parentElement.addEventListener('click', function() {
        controller.setCurrentProject();
      });

      this.render();
    },

    render: function() {
      let currProj = controller.getCurrentProject();

      this.sprite.style.backgroundImage = "url(" + currProj.sprite.source + ")";
      this.sprite.style.backgroundSize = currProj.sprite.size;
      this.numContainer.innerHTML = currProj.num;
      this.titleContainer.innerHTML = currProj.title;
      this.textContainer.innerHTML = currProj.description;
      this.roleContainer.innerHTML = currProj.role;
      this.nextContainer.innerHTML = currProj.next.name;

      this.interval = setInterval(function () {
        controller.getSpritePos();
      }, 150);
    },

    animateBackground: function(x) {
      this.sprite.style.backgroundPosition = x + "% 0%";
    },

    clearInterval: function() {
      clearInterval(this.interval);
    }
  };

  controller.init();
})();
