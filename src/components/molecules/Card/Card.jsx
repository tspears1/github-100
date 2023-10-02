
const Card = ({ content }) => {
    const { name, description, owner, stars, avatar, rank } = content

    // cut description to 150 characters and add ellipsis
    const summary = description.length > 80 ? `${ description.substring(0, 80) }...` : description

    // formatted rank with leading zeros
    const ranking = rank < 10 ? `00${ rank }` : rank < 100 ? `0${ rank }` : rank

    //Todo: lazyload transition, add framer motion animation, make header sticky, add hover state, skeletons.
    //Todo: noise filter?
    //TODO: CONTAINER QUERIES.
    return (
        <article className="card">
            <div className="card__header">
                <div className="card__eyebrow">
                    <div className="card__eyebrow-icon material-symbols-rounded">star</div>
                    <div className="card__eyebrow-text">{ stars.toLocaleString() }</div>
                </div>
                <div className="card__avatar">
                    <img className="lazyload" src={ avatar } alt={ owner } />
                </div>
            </div>
            <div className="card__body">
                <div className="card__author">
                    { owner }
                </div>
                <div className="card__title">
                    <button className="card__link">
                        { name }
                    </button>
                </div>
                <div className="card__description">{ summary }</div>
            </div>

            <div className="card__footer">
                <div className="card__ranking">
                    { ranking }
                </div>
                <button className="card__button button button--outline" title="View Repo Details">
                    <span className="sr-only">View Repo Details</span>
                    <span className="material-symbols-rounded">add</span>
                </button>
            </div>
        </article>
    )
}

export default Card