import {Link} from "react-router-dom";
import {LayoutContainer, SectionWrapper, SiteContainer} from "../../layouts/Layout";
import Header from "../../components/Header/Header";

const PageNotFound = () => {
  return (
    <LayoutContainer>
      <Header />
      <SectionWrapper>
        <SiteContainer className={"h-100"} heading={"404 Error"}>
          <>
            <div className='mb-3 h4'>Page not found!</div>
            <Link to={"/"}> Go to main</Link>
          </>
        </SiteContainer>
      </SectionWrapper>
    </LayoutContainer>
  );
};

export default PageNotFound;
