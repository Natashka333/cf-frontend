import React, { useState } from "react";
import socket from "./socket";
import { roomName } from "../../common/common";

const TimerForm = (): JSX.Element => {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		setIsLoading(true);

		socket.timeout(1000).emit(
			"startCountdown",
			{
				roomName,
				durationInSeconds: parseInt(value),
			},
			() => {
				setIsLoading(false);
			}
		);
		socket.emit("timerRequest", { roomName });
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				onChange={(e): void => setValue(e.target.value)}
				value={value}
				type="number"
				placeholder="Enter something"
			/>

			<button type="submit" disabled={isLoading}>
				Submit
			</button>
		</form>
	);
};

export default TimerForm;
