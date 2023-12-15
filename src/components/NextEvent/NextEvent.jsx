import React from "react";
import "./NextEvent.css";
import { Link } from "react-router-dom";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const NextEvent = ({ title, description, eventDate, idEvento }) => {
  
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"

        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      <Link className="detalhes_a" to={`/Detalhes-evento/${idEvento}`}>
        <a
         
          className="event-card__connect-link"
        >
          Detalhes
        </a>
      </Link>
    
      
    </article>
  );
};

export default NextEvent;
