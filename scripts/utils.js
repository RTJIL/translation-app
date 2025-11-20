// === RENDER ===
export function renderForm(main) {
  main.insertAdjacentHTML(
    "beforeend",
    `
      <form action="" class="main__form" id="translator-form">
        <div class="textarea-wrapper">
          <label for="user-input" class="description sr-only">Text to translate</label>
          <textarea
            type="text"
            placeholder="How are you?"
            name="user-input"
            id="user-input"
            class="textarea"></textarea>
          <button type="submit" class="btn" disabled><i class="fa-regular fa-paper-plane"></i></button> 
        </div>

        <fieldset>
          <legend class="sr-only">Select a language</legend>
          <label for="fr" class="radio-select" aria-label="French">
            <input type="radio" id="fr" name="language" value="fr" />
            <img src="/assets/fr-flag.png" alt="France flag" />
          </label>

          <label for="es" class="radio-select" aria-label="Spanish">
            <input type="radio" id="es" name="language" value="es" />
            <img src="/assets/sp-flag.png" alt="Spain flag" />
          </label>

          <label for="jp" class="radio-select" aria-label="Japanese">
            <input type="radio" id="jp" name="language" value="jp" />
            <img src="/assets/jpn-flag.png" alt="Japan flag" />
          </label>
        </fieldset>

      </form>
    `
  )
}

export function renderResult(response, assistantMessageId) {
  const responseText = document.querySelector("#response-" + assistantMessageId)

  responseText.classList.remove("loading")
  responseText.textContent = response
}

export function renderLoading(
  messages,
  userInput,
  userMessageId,
  assistantMessageId
) {
  messages.insertAdjacentHTML(
    "beforeend",
    `
      <p class="message user" id="request-${userMessageId}"></p>
      <p class="message system loading" id="response-${assistantMessageId}"></p>
    `
  )

  const requestText = messages.querySelector(`#request-${userMessageId}`)
  requestText.textContent = userInput
}

export function renderError(assistantMessageId, error) {
  const assistantMessage = document.getElementById(
    `response-${assistantMessageId}`
  )

  assistantMessage.classList.remove("loading")
  assistantMessage.classList.add("error")

  assistantMessage.textContent = `OH NO! ${error}😭`
}

// === EVENT LISTENERS ===

// check if textarea is empty and is any radio button checked
export function eventListeners() {
  let initialized = false

  function changeDisabled() {
    const textarea = document.querySelector("textarea")
    const button = document.querySelector('button[type="submit"]')

    if (!textarea || !button) return

    const isChecked = !!document.querySelector('input[name="language"]:checked')
    button.disabled = textarea.value.trim() === "" || !isChecked
  }

  return {
    listenUserInput() {
      if (initialized) return
      initialized = true

      const events = ["input", "change", "submit"]
      events.forEach((event) => {
        document.body.addEventListener(event, changeDisabled)
      })
    },

    rebuildUI() {
      changeDisabled()
    },
  }
}

// XTODO: remake interface to be like chat app
