

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://anna-koretchko.ue.r.appspot.com/garmin">
    <img src="images/network_graph.png" alt="Logo" width="800" height="500">
  </a>

  <h3 align="center">Board Game Analysis</h3>

  <p align="center">
    Analyzing Board Game Data while Practicing Data Visualization and Interactive Graphs


  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Interactive Demos</a>
      <ul>
        <li><a href="#prerequisites">Network Graph</a></li>
        <li><a href="#installation">Multiple Line Graphs</a></li>
        <li><a href="#installation">Stacked Line Graphs</a></li>
        <li><a href="#installation">Choropleth Map</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<p align="center">
<img src="images/Garmin-logo2.jpeg" alt="Logo"> 
</p>
My family is extremely competitive and loves to play board games. I wanted to work on some of my interactive data visualization skills and decided to use board game data as inspiration. These graphs illustrate various ways in whcih data can be analyzed, presented, and shared!


This repo is the source code for the interactive graphs. If you wish to run locally, you will need to run a local host server in the local folder location of where you have downloaded this code. 

* Click [here] for instructions on how to run locally (https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)

### Built With

* [D3](https://d3js.org/)
* HTML
* CSS
* JS




<!-- GETTING STARTED -->
## Interactive Demos

### Network Graph


  <a href="https://anna-koretchko.ue.r.appspot.com/graph">
    <img src="images/network_graph.png" alt="Logo" width="800" height="500">Click Here for Demo
  </a>

### Installation and Example Run

1. Create conda environment for garmin_analyis project ([install conda Here](https://conda.io/projects/conda/en/latest/user-guide/install/index.html))

2. Downdload lastest wheel (whl) from from the dist folder [here] (/dist/garmin_analysis-0.1-py3-none-any.whl)

3. cd to the downloaded wheel file
   ```sh
   (garmin_env) cd Downloads/garmin_analysis-0.X-py3-none-any.whl
   ```
4. pip install `garmin_analysis-0.X-py3-none-any.whl` to your newly created conda environment
   ```sh
   (garmin_env) pip install garmin_analysis-0.X-py3-none-any.whl
   ```
5. Now run the package which requires two inputs: -data and -output_path 
    ```sh
    (garmin_env) python -m garmin_analysis -data "<path to data file from Garmin Connect" -output_path "<path to where you want the output files to be saved"
    ```



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

* Anna Koretchko - [Personal Website](https://anna-koretchko.ue.r.appspot.com/index)
* Email - annakoretchko@gmail.com







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/annakoretchko/garmin_analysis/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anna-koretchko-1b5b0211a/
[product-screenshot]: images/screenshot.png

