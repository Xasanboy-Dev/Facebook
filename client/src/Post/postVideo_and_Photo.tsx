import axios from "axios"
import { useState } from "react"
export let gitHubUserImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEXw8PDPa2jy9vbOaGXNYV3p2NjVh4Xo09PWjYvr3d3ViIbo1dTNX1vMXFnjwL/q2trTgH7u6urLVlPanJvQcW70/P3boZ8YGsMNAAACCUlEQVR4nO3cW1IqQRBFUaQf3kaEBh/zH6rOgKyIzLKIu/YADrlCPqUOB0mSJEmS9F+3LZ27dQYe1/e5a/fX3sJ/00vXZkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCwmLhFOmZhdN+Wh92+nxi4bwcH/cVmxpUGDkrcSozQsKaqcwICWumMiMkrJnKjJCwZiozQsKaqcwICWumMiMkrJnKjJCwZiozQsKaqcwICWumMiMkrJnKLHjW27HrVLBb5A2HbT0HHkJ4v1y7Ti1bSLjcAx943pfXh71dIk9LpE6F/tDLHPjSTKfI9+/ae2pNFIa2xpwa9CxCwvHPIiQc/yxCwvHPIiQc/yxCwvHPIiQc/yxCwvHPIiQc/yxCwvHPIiQc/yxCwqqzzpFXI55ZuO2PH41Y148nFh4Cj0b81vuqzK28CAmrtvIiJKzayouQsGorL0LCqq28CAmrtvIiJKzayouQsGorL0LCqq28CAmrtvIiJKzayouQsGorr/7CyI/oE/uD3+PvW+RxiVvkAyNL10tv4csUeMRhvofeNlkjD0LEjsoUhkp8vSUUIWF7hIStERK2R0jYGiFhe4SErREStkdI2BohYXuEhK0RErZHSNgaIWF7hH8lDD31EOocFKYVE8aeegi1LxHhd9rnxR6giD71kPYeRObndf43JkmSJEmSxukH4Bp/LK37x7MAAAAASUVORK5CYII='
export default function POSTS() {
    let email = 'hasan@gmail.com'
    let [image, setImage] = useState(Boolean)
    axios.get(`http://localhost:8080/images/${email}.png`)
        .then(res => {
            if (res.data.length !== 0) {
                setImage(true)
            }
        }).catch(err => {
            if (err.message == "Network Error") {
                setImage(false)
            }
        })
    return <div className="border border-dark">
        <div className={'w-full border border-dark mt-5'}>
            <img src={image ? `http://localhost:8080/images/${email}.png` : gitHubUserImage} />
        </div>
    </div>
}