import {
  renderForm,
  renderResult,
  eventListeners,
  renderLoading,
  renderError,
} from "./utils.js"

import { generateResponse } from "./api.js"

// === SELECTORS ===

const main = document.querySelector("main")

// === EVENT LISTENERS ===
const listeners = eventListeners()

document.addEventListener("click", async (event) => {
  const submitBtn = event.target.closest('button[type="submit"]')
  const resetBtn = event.target.closest('button[type="reset"]')

  if (submitBtn) {
    event.preventDefault()

    const [userInput, language] = getUserInput()

    renderLoading(main)

    try {
      const response = await generateResponse(userInput, language)
      renderResult(main, userInput, response)
    } catch (error) {
      renderError(main, error)
      console.error(error)
    }
  } else if (resetBtn) {
    event.preventDefault()
    renderForm(main)
  }
})

function getUserInput() {
  const form = document.getElementById("translator-form")

  const formData = new FormData(form)
  return [formData.get("user-input")?.trim(), formData.get("language")]
}

// === INIT ===
// renderLoading(main)
renderForm(main)
listeners.listenUserInput()
