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
const messages = document.getElementById("messages")

// === EVENT LISTENERS ===
const listeners = eventListeners()

document.addEventListener("click", async (event) => {
  const submitBtn = event.target.closest('button[type="submit"]') // select through other elements
  if (!submitBtn) return

  event.preventDefault()

  const [userInput, language] = getUserInput()
  const [userMessageId, assistantMessageId] = generateIds()

  renderLoading(messages, userInput, userMessageId, assistantMessageId)
  focusTextarea()

  listeners.rebuildUI(true)

  try {
    const response = await generateResponse(userInput, language)
    renderResult(response, assistantMessageId)
  } catch (error) {
    renderError(assistantMessageId, error)
    console.error(error)
  } finally {
    listeners.rebuildUI(false)
  }
})

function getUserInput() {
  const form = document.getElementById("translator-form")
  const textarea = form.querySelector("textarea")
  const formData = new FormData(form)

  textarea.value = ""
  listeners.rebuildUI()
  return [formData.get("user-input")?.trim(), formData.get("language")]
}

function generateIds() {
  const userMessageId = Math.floor(Math.random() * 100000000)
  const assistantMessageId = Math.floor(Math.random() * 100000000)

  return [userMessageId, assistantMessageId]
}

function focusTextarea() {
  requestAnimationFrame(() => {
    const textarea = document.querySelector("textarea")
    if (textarea) textarea.focus()
  })
}

// === INIT ===
renderForm(main)
listeners.listenUserInput()
