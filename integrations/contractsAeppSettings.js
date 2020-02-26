// export default {"account":{"pub":"ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU","priv":"bb9f0b01c8c9553cfbaf7ef81a50f977b1326801ebf7294d1c2cbccdedf27476e9bbf604e611b5460a3b3999e9771b6f60417d73ce7c5519e12f7e127a1225ca"},"url":"http://localhost:3001/","internalUrl":"http://localhost:3001//internal/","host":"http://localhost:3001/","internalHost":"http://localhost:3001/internal/"}
// module.exports = {
//     "account": {
//         "pub": "ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU",
//         "priv": "bb9f0b01c8c9553cfbaf7ef81a50f977b1326801ebf7294d1c2cbccdedf27476e9bbf604e611b5460a3b3999e9771b6f60417d73ce7c5519e12f7e127a1225ca"
//     },
    // "url": "https://testnet.aeternity.io/ct_2PnQPox8fcJuAzPuhuHnNNUvVYfd2sZYjpiX6MeFcx8iK4cNRa"
//     "url": "http://localhost:3001/",
//     "internalUrl": "http://localhost:3001/internal/",
//     "host": "http://localhost:3001/",
//     "internalHost": "http://localhost:3001/internal/"
// }
export default {
    contractAddress: "ct_2PnQPox8fcJuAzPuhuHnNNUvVYfd2sZYjpiX6MeFcx8iK4cNRa",
    contractSource: `payable contract GameTrader =
    record game = {
      owner : address,
      title : string,
      price : int,
      creator: address,
      forSale: bool,
      photoUrl: string}

    record state = {
      games : map(int, game),
      gamesLength : int}

    entrypoint init() = {
      games = {},
      gamesLength = 0}

    entrypoint getGames() : map(int, game) =
      state.games

    entrypoint getGame(index : int) : game =
      switch(Map.lookup(index, state.games))
        None => abort("Index does not exist")
        Some(x) => x

    stateful entrypoint addGame(title': string, price': int, photoUrl':string, forSale': bool) =
      let game = { owner = Call.caller, creator = Call.caller, title = title', price = price', forSale = forSale', photoUrl = photoUrl'}
      let index = getGamesLength() + 1
      put(state { games[index] = game, gamesLength = index })

    payable stateful entrypoint buyGame( id : int) =
      let purchase = getGame(id)
      if(Call.value >= purchase.price)
       Chain.spend(purchase.owner, purchase.price)
       let update = state.games{[id].owner = Call.caller, [id].forSale = false}
       put(state {games = update})
      else
       abort("Balance too low")

    stateful entrypoint updateGame(index : int, price' : int, forSale' : bool) =
      let update = state.games{[index].price = price', [index].forSale = forSale'}
      put(state {games = update})

    entrypoint getGamesLength() : int =
      state.gamesLength
 `

}
