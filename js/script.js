const descriptions = document.querySelectorAll('.photo__description')
const images = document.querySelectorAll('img')
const imgLinks = document.querySelectorAll('.photo__img')
const authors = document.querySelectorAll('.photo__author-link')
const date = document.querySelectorAll('.photo__date-text')
const error = document.querySelector('.error')
const errorTxt = document.querySelector('.error__text')
const apiKeyInput = document.querySelector('#api-key')
const orderBySelect = document.querySelector('#api-order-by')

const getPhotos = () => {
	const apiLink = 'https://api.unsplash.com/photos?'
	const apiClientParam = 'client_id='
	const apiKey = apiKeyInput.value
	const pageApiParam = '&page='
	const page = 1
	const perPageApiParam = '&per_page='
	const perPage = 4
	const orderByApiParam = '&order_by='
	const orderBy = orderBySelect.value
	const apiUrl =
		apiLink + apiClientParam + apiKey + pageApiParam + page + perPageApiParam + perPage + orderByApiParam + orderBy

	axios
		.get(apiUrl)
		.then(res => {
			error.classList.remove('error--display-block')
			const photoData = res.data
			console.log(res)

			descriptions.forEach((description, i) => {
				description.textContent = photoData[i].description || 'No description available'
			})

			images.forEach((image, i) => {
				image.setAttribute('src', photoData[i].urls.regular)
				image.setAttribute('alt', photoData[i].alt_description)
			})

			imgLinks.forEach((imgLink, i) => {
				imgLink.setAttribute('href', photoData[i].urls.regular)
			})

			authors.forEach((author, i) => {
				author.textContent = photoData[i].user.first_name
				author.setAttribute('href', photoData[i].user.links.html)
			})

			date.forEach((date, i) => {
				date.textContent = new Date(photoData[i].created_at).toLocaleDateString('en-GB')
			})
		})
		.catch(err => {
			error.classList.add('error--display-block')
			let statusCode = err.message
			errorTxt.textContent = statusCode
		})
}

window.addEventListener('DOMContentLoaded', getPhotos)
apiKeyInput.addEventListener('change', getPhotos)
orderBySelect.addEventListener('change', getPhotos)
