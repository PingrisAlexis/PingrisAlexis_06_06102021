const photographersPageCardsContainer = document.querySelector(".photographer-page-header");
const mediasPageContainer = document.querySelector(".media-cards-container");
const urlSearch = new URLSearchParams(window.location.search).get("id");
const lightboxMedias= document.querySelector(".lightbox-medias");
const sortByContainer = document.querySelector(".order-by-select");
const contactFormPhotographerName = document.querySelector(".form-title");

fetch("../../fisheye.json")
    .then(resp => resp.json())
    .then(data => {

        let loadPhotographers = data.photographers;
        let loadMedias = data.media;
        let currentPhotographerMedia = loadMedias.filter((media) => media.photographerId === parseInt(urlSearch));

        //Native order medias by likes
        sortBy(currentPhotographerMedia, "likes").forEach((media) => {

            mediasPageContainer.innerHTML += new MediaCard(media).getMediaCard();
            lightboxMedias.innerHTML += new MediaCard(media).getMediaLightbox();
        })

        //Event handler on categories select
        sortByContainer.addEventListener("change",(e) => {

            handleSort(e.target.value, currentPhotographerMedia, mediasPageContainer, lightboxMedias)
            handleLikes();
            handleLightbox();
        });

        //hydrate photographer in HTML elements
        const currentPhotographer = loadPhotographers.find((photographer) => photographer.id === parseInt(urlSearch));
            if (currentPhotographer) {

                photographersPageCardsContainer.innerHTML = new PhotographerCard(currentPhotographer).getPhotographerPageCard();
                contactFormPhotographerName.innerHTML += new PhotographerCard(currentPhotographer).getPhotographerName();
            }
        handleLikes();
        handleLightbox();

    })
    .catch(err => {
        console.log(err);
    })
