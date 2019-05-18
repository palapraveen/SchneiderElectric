(function () {
     "use strict";

    /* Create shapes Object */
    let shapes = [
        {
            'imageName': 'Datacenter',
            'imagePath': 'assets/Datacenter.jpg',
            'shape': 'circle',
            'class': 'circle-shape'
        },
        {
            'imageName': 'GettyImages',
            'imagePath': 'assets/GettyImages.jpg',
            'shape': 'rectangle',
            'class': 'rectangle-shape'
        },
        {
            'imageName': 'EVlink_2',
            'imagePath': 'assets/EVlink.png',
            'shape': 'square',
            'class': 'square-shape'
        },
        {
            'imageName': 'Schneider',
            'imagePath': 'assets/Schneider.jpg',
            'shape': 'traingle',
            'class': 'traingle-shape'
        }
    ];

    /* dyanamically creating div and appending to the dom, we are iterating the shapes object here*/

    var dynamicDiv = document.createDocumentFragment();
    for (var i=0; i< shapes.length;i++) {
        let parentDiv = document.createElement('div');
        parentDiv.className = 'col-sm-12 col-xs-12 col-md-6 mb-2 mt-2 shuffle_div';
        let childDiv = document.createElement('div');
        shapes[i].shape == 'rectangle' ? childDiv.className = '' + shapes[i].class : childDiv.className = shapes[i].class;
        let createLi = document.createElement('LI');
        createLi.className = 'list-images';
        let createAnchor = document.createElement('a');
        createAnchor.className = 'imageDetails';
        createAnchor.setAttribute('href', 'javaScript:Void(0)');
        let createImg = document.createElement('IMG');
        createImg.setAttribute("src", shapes[i].imagePath);
        createImg.setAttribute("alt", shapes[i].imageName);
        createImg.setAttribute("href", 'javaScript:Void(0)');
        shapes[i].shape == 'circle' ? createImg.className = 'shapes rounded-circle' : createImg.className = 'shapes';
        createAnchor.appendChild(createImg);
        createLi.appendChild(createAnchor);
        childDiv.appendChild(createLi);
        parentDiv.appendChild(childDiv);
        dynamicDiv.appendChild(parentDiv);
    }
    document.getElementById("schneider-content-section").appendChild(dynamicDiv);

    /* shuffle the div's */

    function shuffle(elements) {
        let allelements = (function () {
            let tempArray = [], l = elements.length;
            while (l--) { tempArray[tempArray.length] = elements[l]; }
            return tempArray;
        })();

        let shuffled = (function () {
            let length = allelements.length, tempArray = [];
            while (length--) {
                let random = Math.floor(Math.random() * allelements.length),
                    randomElement = allelements[random].cloneNode(true);
                allelements.splice(random, 1);
                tempArray[tempArray.length] = randomElement;
            }
            return tempArray;
        })(), length = elements.length;

        while (length--) {
            elements[length].parentNode.insertBefore(shuffled[length], elements[length].nextSibling);
            elements[length].parentNode.removeChild(elements[length]);
        }
    }

    document.getElementById("shuffleImages").addEventListener("click", function () {
        shuffle(document.querySelectorAll('.shuffle_div'));
    });

    /* on click of every image or list-item , we are taking the details of image and rendering in popup*/

    document.addEventListener("click", function () {
        if (event.target.classList.contains('shapes')) {
            addModal();
            document.getElementById('modalTitle').innerText = event.target.alt;
            document.getElementById('modalImage').src = event.target.src;
        } else if (event.target.classList.contains('imageDetails')) {
            addModal();
            document.getElementById('modalTitle').innerText = event.target.children[0].alt;
            document.getElementById('modalImage').src = event.target.children[0].src;
        }
    });

/*  will focus on the close icon */

    document.addEventListener("keyup", function (e) {
        if(e.keyCode){
        if (event.target.classList.contains('shapes')) {
            document.getElementById('closePopup').focus(); 
        } else if (event.target.classList.contains('imageDetails')) {
            document.getElementById('closePopup').focus(); 
        }
      }
    });

/*  will show modal popup */

    let modal = document.querySelector(".modal");
    let closeButton = document.querySelector(".close-button");
    function addModal() {
        modal.classList.add("show-modal");
    }
    function closeModal() {
        modal.classList.remove("show-modal");
    }

    function windowOnClick(event) {
        if (event.target.classList.contains('close-button')) {
            closeModal();
        }
    }

    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", windowOnClick);


})();