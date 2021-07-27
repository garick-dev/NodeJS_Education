const getContentList = async () => {
  const { data } = await axios.get("/blog/list");

  let html = "";

  const contentList = data.result.globalList;
  for (let item of contentList) {
    html = `${html} <button data-id=${item.id}> ${item.content} </button>`;
    console.log(html);
  }
  const buttonBlogEl = document.querySelector(".root");
  buttonBlogEl.innerHTML = html;
};

getContentList();
