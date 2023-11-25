import { useSelector } from "react-redux";
import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import { particlesInit } from "../particle-config";

export const ParticleComponent = () => {
  const lightTheme = "light";
  const darkTheme = "is_dark";
  // const theme = "is_dark"
  const theme = useSelector((e) => e.themeStore.theme);
  console.log(theme);

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    // <div style={{
    //   backgroundColor: theme === darkTheme ? "#13131d" : "",
    //   width: "100%",
    //   position: "absolute",
    //   top: 0,
    //   right: 0,
    //   height: "100%",
    // }}>
    // </div>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
        },
        background: {
          color: {
            value: theme === darkTheme ? "#13131d" : "",
          },
        },
        fpsLimit: 60,
        style: {
          position: "absolute",
        },
        particles: {
          color: {
            // value: ["#E3F8FF", "#28CC9E", "#A6ED8E"],
            value: theme === darkTheme ? ["#E3F8FF", "#28CC9E", "#A6ED8E"] : ["#A5A5A7", "#000000", "#58585A"],
          },
          move: {
            enable: true,
            direction: "top-right",
            random: true,
            speed: 1.5,
          },
          number: {
            value: 200,
          },
          opacity: {
            value: 0.6,
            random: {
              enable: true,
              minimumValue: 0.3,
            },
          },
          shape: {
            type: ["square", "circle"],
          },
          size: {
            value: 2,
          },
        },
      }}
    />
  );
};
