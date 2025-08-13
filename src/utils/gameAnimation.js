async function delay(interaval = 1000) {
  console.log("Player is thinking...")
return new Promise((resolve,reject)=>setTimeout(resolve,interaval))
}

export { delay };
