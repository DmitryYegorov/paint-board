import React, {useEffect, useRef, useState} from 'react'

export default function BoardView() {
	const [isDrawing, setIsDrawing] = useState(false);
	const
		width = window.innerWidth,
		height = window.innerHeight;

	let canvasRef = useRef<HTMLCanvasElement>(null);

	let ctx: CanvasRenderingContext2D;

	useEffect(() => {
		if (canvasRef.current == null) {
			return;
		}

		ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;

		canvasRef.current?.addEventListener("mousedown", startDrawing);
		canvasRef.current?.addEventListener("mousemove", draw);
		canvasRef.current?.addEventListener("mouseup", stopDrawing);
		canvasRef.current?.addEventListener("mouseout", stopDrawing);

		return () => {
			canvasRef.current?.removeEventListener("mousedown", startDrawing);
			canvasRef.current?.removeEventListener("mousemove", draw);
			canvasRef.current?.removeEventListener("mouseup", stopDrawing);
			canvasRef.current?.removeEventListener("mouseout", stopDrawing);
		}
	});

	const startDrawing = (event: MouseEvent) => {
		setIsDrawing(true);

		ctx.beginPath();

		const {offsetX, offsetY} = getMousePosition(event, canvasRef.current!)
		ctx.moveTo(offsetX, offsetY);
	};

	const draw = (event: MouseEvent) => {
		if (!isDrawing) {
			return;
		}

		const {offsetX, offsetY} = getMousePosition(event, canvasRef.current!);
		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();
	};

	const stopDrawing = (event: MouseEvent) => {
		setIsDrawing(false);
		ctx.closePath();
	}

	function getMousePosition(event: MouseEvent, canvas: HTMLCanvasElement) {
		const rect = canvas.getBoundingClientRect();
		const
			x = event.clientX - rect.left,
			y = event.clientY - rect.top;

		return {
			offsetX: x,
			offsetY: y
		};
	}


	return (
		<div>
			<canvas
				width={width}
				height={height}
				ref={canvasRef}
			></canvas>
		</div>
	)
}
