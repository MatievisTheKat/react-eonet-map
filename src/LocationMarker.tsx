import React from "react";
import { Icon } from "@iconify/react";
import wildfires from "@iconify-icons/twemoji/fire";
import volcanoes from "@iconify-icons/twemoji/volcano";
import severeStorms from "@iconify-icons/twemoji/cloud-with-lightning-and-rain";
import earthquakes from "@iconify-icons/ri/earthquake-fill";
import floods from "@iconify-icons/ri/flood-fill";
import landslides from "@iconify-icons/openmoji/landslide";
import drought from "@iconify-icons/carbon/drought";
import dustHaze from "@iconify-icons/carbon/haze";
import snow from "@iconify-icons/twemoji/cloud-with-snow";
import tempExtremes from "@iconify-icons/carbon/temperature";

interface State {}
interface Props {
	lat: number;
	lng: number;
	id: string;
}

const icons: Record<string, any> = {
	wildfires,
	volcanoes,
	severeStorms,
	earthquakes,
	floods,
	landslides,
	drought,
	dustHaze,
	snow,
	tempExtremes,
};

export default class LocationMarker extends React.Component<Props, State> {
	public render() {
		return (
			<div className="EONET___location-marker">
				<Icon style={{ width: "30px" }} icon={icons[this.props.id]} className="EONET___location-icon" />
			</div>
		);
	}
}
