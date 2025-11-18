// === RENDER ===
export function renderForm(main) {
  main.innerHTML = `
    <form action="" class="main__content" id="translator-form">
        <label for="user-input" class="description">Text to translate👇️</label>
        <textarea
          type="text"
          placeholder="How are you?"
          name="user-input"
          id="user-input"
          class="textarea"
        ></textarea>

        <fieldset>
          <legend class="description">Select language👇️</legend>

          <label for="fr" class="radio-select">
            <input type="radio" id="fr" name="language" value="fr" />
            <span class="checkmark"></span>
            <p>French</p>
            <img src="/assets/fr-flag.png" alt="France flag" />
          </label>

          <label for="es" class="radio-select">
            <input type="radio" id="es" name="language" value="es" />
            <span class="checkmark"></span>
            <p>Spanish</p>
            <img src="/assets/sp-flag.png" alt="Spain flag" />
          </label>

          <label for="jp" class="radio-select">
            <input type="radio" id="jp" name="language" value="jp" />
            <span class="checkmark"></span>
            <p>Japanese</p>
            <img src="/assets/jpn-flag.png" alt="Japan flag" />
          </label>
        </fieldset>

        <button type="submit" class="btn" disabled>Translate</button>
      </form>
    `
}

export function renderResult(main, userInput, response) {
  main.innerHTML = `
    <section class="main__content">
      <h2 class="description">Original text👇</h2>
      <p class="textarea" id="request"></p>

      <h2 class="description">Your translation👇</h2>
      <p class="textarea" id="response"></p>
      
      <button type="reset" class="btn">Translate again</button>
    </section>`

  const requestText = document.querySelector("#request")
  const responseText = document.querySelector("#response")

  requestText.textContent = userInput
  responseText.textContent = response
}

export function renderLoading(main) {
  main.innerHTML = `
    <section class="main__content">
      <div class="spinner"></div>
    </section>`
}

export function renderError(main, error) {
  main.innerHTML = `
    <section class="main__content">
      <h2 class="error">OH NO! ${error} 
      😭</h2>
    </section>`
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

      const events = ["input", "change"]
      events.forEach((event) => {
        document.body.addEventListener(event, changeDisabled)
      })
    },
  }
}

// XTODO: implement loading
// XTODO: connect to OpenAI API
// TODO: remake interface to be like chat app
