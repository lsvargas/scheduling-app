const initializeWebSocket = (wId: string, onMssgCallback: any) => {
  const ws = new WebSocket("ws://localhost:4000/cable")
  ws.onopen = () => {
    console.log("connected to websocket")
    ws.send(JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        id: wId,
        channel: "BookingsChannel"
      })
    }));
  }
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;
  
    onMssgCallback(data);
  }

  return { ws }
}


export { initializeWebSocket };
