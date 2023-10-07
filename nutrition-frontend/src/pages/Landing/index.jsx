import LandingHeader from "../../components/01_LandingHeader";
import LandingAbout from "../../components/02_LandingAbout";
import LandingServices from "../../components/03_LandingServices";

function Landing() {
    return(
        <main className="landing">
            <LandingHeader />
            <LandingAbout />
            <LandingServices />
        </main>
    )
}

export default Landing;