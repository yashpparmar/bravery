import {FC, ReactNode} from "react";

interface ILayoutProps {
  className?: string;
  children: ReactNode;
}

export const LayoutContainer: FC<ILayoutProps> = (props) => (
  <div style={{height: "100vh"}} className={props.className}>
    {props.children}
  </div>
);

export const SectionWrapper: FC<ILayoutProps> = (props) => (
  <div style={{padding: "3.75rem 0 0 0"}} className={`h-100 ${props.className || ""}`}>
    {props.children}
  </div>
);

interface ISiteContainerProps {
  logo?: {
    isStatic: boolean;
    url: string;
  };
  heading: string;
  className?: string;
  children: ReactNode;
}

export const SiteContainer: FC<ISiteContainerProps> = (props) => {
  const {logo = {url: "", isStatic: false}, heading = "", className = "", children} = props;
  return (
    <div className={className ? "site-container " + className : "site-container"}>
      <div className='masthead bg-white rounded shadow-sm text-center'>
        <div className='container d-flex align-items-center flex-column'>
          {logo && logo.url && (
            <img
              className='masthead-avatar mb-5'
              src={`${
                logo.isStatic
                  ? require("../assets/images/" + logo.url)
                  : logo.url ?? require("../assets/images/User.jpg")
              }`}
              alt='Logo'
            />
          )}

          {heading && <h1 className='masthead-heading text-uppercase mb-0'>{heading}</h1>}

          <div className='divider-custom'>
            <div className='divider-custom-line'></div>
            {/* <div className='divider-custom-icon'>
              <i className='fas fa-star'></i>
              <i class='bi bi-star-fill'></i>
            </div>
            <div className='divider-custom-line'></div> */}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
