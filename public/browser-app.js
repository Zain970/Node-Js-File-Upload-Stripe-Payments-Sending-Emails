const url = '/api/v1/products'
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.querySelector('#name')
const priceInputDOM = document.querySelector('#price')
const imageInputDOM = document.querySelector('#image')

const containerDOM = document.querySelector('.container')
let imageValue;


// WHEN IMAGE IS UPLOADED

imageInputDOM.addEventListener('change', async (e) => {

  const imageFile = e.target.files[0];
  const formData = new FormData();

  formData.append('image', imageFile)
  try {

    const { data: { image: { src } } } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log("Path got from server : ", src);
    imageValue = src

    console.log("Image value : ", imageValue);


  }
  catch (error) {
    imageValue = null
    console.log(error);
  }
})

// WHEN SUBMITTED BROWSERS MAKES A GET REQUEST
fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()

  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;

  console.log("Name : ", nameValue);
  console.log("Price : ", priceValue);
  console.log("Image Value : ", imageValue);

  try {

    const product = { name: nameValue, price: priceValue, image: imageValue }

    await axios.post(url, product);
    fetchProducts()

  }
  catch (error) {
    console.log(error);
  }
})



async function fetchProducts() {
  try {
    const { data: { products } } = await axios.get(url);

    const productsDOM = products.map((product) => {
      return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`
    }).join('')
    containerDOM.innerHTML = productsDOM
  } catch (error) {
    console.log(error);
  }

}

fetchProducts()