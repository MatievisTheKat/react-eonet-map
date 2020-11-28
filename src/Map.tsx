import React from "react";
import GoogleMap from "google-map-react";

import LocationMarker from "./LocationMarker";
import Axios from "axios";

import "./index.css";

interface State {
	data: Event[];
	loading: boolean;
}
interface Props {
	googleApiKey: string;
}

interface Event {
	id: string;
	title: string;
	description: string | null;
	link: string;
	closed: boolean | null;
	categories: Category[];
	geometry: Geometry[];
}

interface Category {
	id: string;
	title: string;
}

interface Geometry {
	magnitudeValue: string | null;
	magnitudeUnit: string | null;
	date: string;
	type: string;
	coordinates: number[];
}

export default class Map extends React.Component<Props, State> {
	constructor(props: Props | Readonly<Props>) {
		super(props);

		this.state = {
			data: [],
			loading: false,
		};
	}

	private set loading(loading: boolean) {
		this.setState({ loading });
	}

	public async componentDidMount() {
		this.loading = true;
		const res = await Axios.get("https://eonet.sci.gsfc.nasa.gov/api/v3/events").catch(console.error);

		if (res) {
			const events = res.data.events as Event[];
			this.setState({
				data: events.filter(
					(e) => e.geometry && e.geometry[0] && e.geometry[0].coordinates[1] && e.geometry[0].coordinates[0]
				),
			});
			this.loading = false;
		}
	}

	public render() {
		return (
			<div className="EONET___map">
				<header className="EONET___header">
					<h3>Powered By NASA</h3>
					<p className="EONET___text-sm">Natural Events Currently Tracked: {this.state.data.length}</p>
				</header>
				{this.state.loading ? (
					<div>
						<h1>Fetching Data...</h1>
					</div>
				) : (
					<GoogleMap
						bootstrapURLKeys={{ key: this.props.googleApiKey }}
						defaultCenter={{
							lat: 0,
							lng: 0,
						}}
						defaultZoom={1}>
						{this.state.data.map((e, i) => {
							console.log(e.categories[0].id);
							return (
								<LocationMarker
									key={i}
									id={e.categories[0].id}
									lat={e.geometry[0].coordinates[1]}
									lng={e.geometry[0].coordinates[0]}
								/>
							);
						})}
					</GoogleMap>
				)}
			</div>
		);
	}
}
