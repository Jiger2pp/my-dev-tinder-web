const FeedCard = ({user}) => {
    const { firstName, lastName, age, skills, gender, phone, about } = user;
    return (
            <div className="flex flex-col items-center justify-center my-10">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                        alt="Avatar"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{age ? age : "Age not added"}, { firstName + " " + lastName}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default FeedCard;