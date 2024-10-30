function getTime(time) {
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hours} hours ${minutes} minutes ${remainingSecond} seconds`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// loadCategories data
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// loadVideos data
const loadVideos = (searchTex = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTex}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// loadCategoryVideos data
const loadCategoryVideos = (id) => {
  //   alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");

      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// load Details
const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

// display Details
const displayDetails = (video) => {
  const detailsContainer = document.getElementById("modalContent");

  detailsContainer.innerHTML = `
    <img src=${video.thumbnail} alt="">
    <p>${video.description}</p>
  `;

  //   way-1
  //   document.getElementById("showModalData").click();

  //   way-2
  document.getElementById("customModal").showModal();
};
// display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");

  //   clear video container
  videosContainer.innerHTML = "";

  //   conditions for NO VIDEOS
  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-fit flex flex-col gap-5 justify-center items-center">
      <img src="assets/Icon.png" alt="" />
      <h2 class="font-bold text-xl">No Content Here in this Category</h2>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute bg-black text-white text-xs bottom-2 right-2 p-1 rounded">${getTime(
              video.others.posted_date
            )}</span>`
      }
    </figure>
    <div class="py-2 flex gap-2">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${
          video.authors[0].profile_picture
        } alt="">
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified === true
            ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">`
            : ""
        }
       </div>
        <p> <button onclick="loadDetails('${
          video.video_id
        }')" class="btn btn-sm btn-error">Details</button></p>
    </div>
  </div>
    `;
    videosContainer.append(card);
  });
};

// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    categoriesContainer.append(buttonContainer);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();
