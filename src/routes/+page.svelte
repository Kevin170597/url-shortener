<script>
    let origUrl;
    let response;

    const postUrl = async () => {
        const req = await fetch("/api/shortener", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ origUrl }),
        });
        const res = await req.json();
        console.log(12, res);
        response = res;
    };

    const showError = (error) => {
        if (error === "url is required") return "Ingresar URL.";
        if (error === "invalid url") return "Ingresar URL válida.";
        if (error === "server error")
            return "Algo saió mal. Intentalo más tarde.";
    };
</script>

<svelte:head>
    <link rel="icon" href="/icon.png"/>
    <title>Acortador de URL</title>
</svelte:head>
<header>
    <img src="/logo.png" alt="logo">
</header>
<div class="shortenerContainer">
    <h1>Acortador de link</h1>
    <form on:submit={postUrl}>
        <input type="text" placeholder="url" bind:value={origUrl} />
        <button>Acortar</button>
    </form>
    {#if response && !response.error}
        <div class="shortContainer">
            <a target="_blank" href={response.url.shortUrl}>
                {response.url.shortUrl}
            </a>
        </div>
    {/if}
    {#if response && response.error}
        <div class="errorContainer">
            <p>{showError(response.error)}</p>
        </div>
    {/if}
</div>
<div class="About">
    <h1>Enlaces cortos.</h1>
    <p>El servicio para crear enlaces cortos es un sitio con el que puede acortar significativamente cualquier enlace, mientras que al mismo tiempo funcionará exactamente igual que el enlace largo original.</p>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
    header {
        height: 10vh;
        background-color: #222222;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
    }
    header img {
        height: 70%;
    }
    .shortenerContainer {
        font-family: "Varela Round", sans-serif;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 50px 0;
        align-items: center;
        height: 80vh;
        background-color: #1b1b1d;
    }
    .shortenerContainer h1 {
        color: #a1a1a1;
        font-size: 50px;
    }
    form {
        width: 100%;
        height: 60px;
        padding: 0 50px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    form input {
        width: 78%;
        height: 100%;
        border: solid 1px #000;
        box-sizing: border-box;
        padding: 0 20px;
        border-radius: 6px;
        background: none;
        border: solid 1px #2e2e2e;
        font-size: 20px;
        color: #5c5c5c;
    }
    form input:focus {
        outline: none;
    }
    form button {
        width: 20%;
        height: 100%;
        border: none;
        box-sizing: border-box;
        border-radius: 6px;
        background-color: #8d80b0;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
    }
    form button:hover {
        background-color: #7f72a1;
    }
    .shortContainer {
        background-color: #222222;
        margin: 40px 0 0 0;
        padding: 20px 20px;
        border-radius: 6px;
    }
    .shortContainer a {
        color: #b9b9b9;
        font-size: 30px;
    }
    .errorContainer {
        background-color: rgb(161, 73, 73);
        margin: 40px 0 0 0;
        padding: 20px 20px;
        border-radius: 6px;
    }
    .errorContainer p {
        margin: 0;
        color: #b9b9b9;
        font-size: 20px;
    }
    .About {
        background-color: rgb(223, 223, 223);
        height: 50vh;
        font-family: "Varela Round", sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 40px 50px;
    }
    .About h1 {
        color: #616161;
        font-size: 40px;
    }
    .About p {
        color: #616161;
        font-size: 20px;
    }
</style>
