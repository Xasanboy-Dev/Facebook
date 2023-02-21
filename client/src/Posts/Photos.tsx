let randomImage = "https://placeimg.com/380/230/nature"

export default function Photos() {


    return <section className="details-card">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card-content">
                        <div className="card-img">
                            <img src={`${randomImage}`} />
                            <span><h4>heading</h4></span>
                        </div>
                        <div className="card-desc">
                            <h3>Heading</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptatum! Dolor quo, perspiciatis
                                voluptas totam</p>
                            <a href="#" className="btn-card">Read</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}