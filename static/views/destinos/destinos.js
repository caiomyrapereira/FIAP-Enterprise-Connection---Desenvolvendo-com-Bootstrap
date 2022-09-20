const elms = document.getElementsByClassName('splide');

for (let i = 0; i < elms.length; i++) {
  new Splide(elms[i], {
    type: 'loop',
    perPage: 4,
    gap: '2%',
    breakpoints: {
      1366: {
        gap: '1%',
        perPage: 2,
      },
      768: {
        gap: '1%',
        perPage: 1,
      },
    },
  }).mount();
}

const destino = destinos.filter((destino) => destino.id == id)[0];


document.getElementById('destino-nome').innerHTML = destino.name;
document.getElementById('destino-titulo').innerHTML = destino.title;
document.getElementById('destino-desc').innerHTML = destino.description;
document.getElementById('destino-img').src = destino.imgDesc;
document.getElementById('destinos_header').style.backgroundImage = `url('${destino.imgBack}')`;

function buscarOfertaVoos() {
  const todayISO = new Date().toISOString().split('T')[0];

  var config = {
    method: 'get',
    url: `https://test.api.amadeus.com/v2/shopping/flight-offers?currencyCode=BRL&originLocationCode=GRU&destinationLocationCode=${destino.aeroporto}&departureDate=${todayISO}&adults=1&max=5`,
    headers: {
      Authorization: `Bearer ${amadeusAPI.token} `,
    },
  };

  axios(config)
    .then(function ({ data }) {
      const voos = document.getElementById('voos');

      data.data.forEach((voo) => {
        const meuVoo = document.createElement('div');
        const empresa = getEmpresa(voo.itineraries[0].segments[0].carrierCode);
        document.getElementById('day').innerHTML = todayISO;

        meuVoo.innerHTML = `
        <div class="card" style="width: 18rem;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Empresa </strong> ${empresa}</li>
            <li class="list-group-item"><strong>Último dia para comprar </strong> ${voo.lastTicketingDate}</li>
            <li class="list-group-item"><strong>Quantidae de assentos </strong> ${voo.numberOfBookableSeats}</li>
            <li class="list-group-item"><strong>Preço </strong> R$${voo.price.total}</li>
          </ul>
        </div>
        `;

        voos.appendChild(meuVoo);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

buscarOfertaVoos();