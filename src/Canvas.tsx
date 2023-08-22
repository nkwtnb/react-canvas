import React, { useEffect, useRef } from "react"

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastPosition = useRef<{x: number, y: number} | null>(null)
  const isMouseDown = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    context.current = canvas.getContext("2d")
    if (!context.current) {
      return
    }
    context.current.lineWidth = 10
    context.current.strokeStyle = "#000000";
    context.current.lineCap = "round"; // これを追加
  }, [])

  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  const handleMouseUp = () => {
    isMouseDown.current = false
    lastPosition.current = null
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context.current) {
      return
    }
    if (!isMouseDown.current) {
      return
    }
    const x  = e.nativeEvent.offsetX
    const y  = e.nativeEvent.offsetY
    if (lastPosition.current === null) {
      lastPosition.current = {x, y}
    }
    // console.log(x, y)
    // console.log(lastPosition.current.x, lastPosition.current.y)
    context.current!.beginPath();
    context.current!.moveTo(lastPosition.current.x, lastPosition.current.y);
    context.current!.lineTo(x, y);
    context.current!.closePath();
    context.current!.stroke();

    lastPosition.current = {x, y}
  }

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!context.current) {
      return
    }
    context.current.strokeStyle = e.target.value;
  }

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!context.current) {
      return
    }
    context.current.lineWidth = Number(e.target.value);
  }
  const clear = () => {
    if (!context.current) {
      return
    }
    console.log("liroa")
    context.current.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
  }
  return (
    <div>
      <div>
        <input type="color" onChange={handleChangeColor}/>
        <input type="range" min="1" max="10" step="1" onChange={handleChangeWidth} />
        <button type="button" onClick={clear}>クリア</button>
      </div>
      <div>
        <canvas width={400} height={300} style={{border: "1px solid"}} ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}/>
      </div>
    </div>
  )
}
export default Canvas