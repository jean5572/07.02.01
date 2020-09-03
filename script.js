    let retter;
    let filter = "alle";
    const popop = document.querySelector("#popop");

    document.addEventListener("DOMContentLoaded", hentData);

    async function hentData() {
        const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
        const respons = await fetch(link);
        retter = await respons.json();
        addEventListenersToButtons();
        vis();
    }



    function vis() {
        let container = document.querySelector(".container");
        let temp = document.querySelector("template");
        container.innerHTML = "";
        retter.feed.entry.forEach(mad => {
            if (filter == "alle" || filter == mad.gsx$kategori.$t) {
                const klon = temp.cloneNode(true).content;
                klon.querySelector(".ret").textContent = mad.gsx$navn.$t;
                klon.querySelector(".kort_beskrivelse").textContent = mad.gsx$kort.$t;
                klon.querySelector(".pris").textContent = mad.gsx$pris.$t + ",-";
                klon.querySelector(".billede").src = "imgs/small/" + mad.gsx$billede.$t + "-sm.jpg";

                klon.querySelector("article").addEventListener("click", () => visDetaljer(mad));

                container.appendChild(klon);
            }
        })
    }


    function visDetaljer(mad) {
        //Hvis det skal gemmes lokalt, Så brug denne, så man kan få en URL, men dette er ikke relevant pga dårlig UX.
        //location.href = `06_detalje.html?id=${person.gsx$id.$t}`;

        popop.style.display = "block";
        popop.querySelector(".ret").textContent = mad.gsx$navn.$t;
        popop.querySelector(".oprindelse").textContent = mad.gsx$oprindelse.$t;
        popop.querySelector(".lang_beskrivelse").textContent = mad.gsx$lang.$t;
        popop.querySelector(".billede").src = "imgs/large/" + mad.gsx$billede.$t + ".jpg";
        popop.querySelector(".pris").textContent = mad.gsx$pris.$t + ",-";

    }

    function addEventListenersToButtons() {
        document.querySelectorAll(".filter").forEach((btn) => {
            btn.addEventListener("click", filterBTNs);
        })
    }

    function filterBTNs() {
        document.querySelectorAll(".filter").forEach((btn) => {
            btn.classList.remove("valgt");
        })

        filter = this.dataset.kategori;
        this.classList.add("valgt");
        document.querySelector("h2").textContent = this.textContent;
        vis();
    }


    document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none"); //HUSK!!! RET

    hentData();
    console.log("Data hentet");
