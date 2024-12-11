# Report

## Oct 21st 2024
- Created GitHub repo and organized folders for reports and milestone 2
  - [link to commit](https://github.com/kitanome/course-dependency-chart/commit/80b794b4a5f37f94069bf0383485e444598055b6)
- Set up main branch protection
- Organized communication Discord server
- Opened Issues & Assigned milestone concept writing to team
  - [Issues](https://github.com/kitanome/course-dependency-chart/issues/1#issue-2603598551) #1-6
- Confirmed project direction & goals with team
- Updated description to ```features.md```
  - [link to commit](https://github.com/kitanome/course-dependency-chart/commit/8988d17ba5c6da97987b678b8b3b22701ceb05b2)
- Created precursor to ```ui-diagram.md```, polished in collaboration with @ian-rapko.
  - Also final reviewer [commit](https://github.com/kitanome/course-dependency-chart/commit/9f23e880f5a203d112d1d2985f04038c439823b3)

## Nov 1st 2024
- Made a short demo of D3.js to render graph for frontend
- Discussed options between D3.js and GoJS

## Nov 8th 2024
- GoJS demo made & discarded, reason: Paid API is not viable.
- Started looking into drawing graph with raw JS.

## Nov 15th 2024
- Graph demo using raw JS and SVG made

 [link to commit](https://github.com/kitanome/course-dependency-chart/commit/0c2e6671c3ac9fa5777f063aa3fccee8dc8e86db)

## Nov 17th 2024
- Successful D3.js graph implementation working MVP

 [link to commit](https://github.com/kitanome/course-dependency-chart/commit/7f05da0c06c50febd46163027c7547558eea280b)

## Dec 1st 2024
- Took charge of project design and delegating the task list
- Major folder restructuring to start working on the back-end
- Organize front-end code into Components

 [link to commit](https://github.com/kitanome/course-dependency-chart/commit/13f2e267efe705111ee4844f2da9ffa59a2cbc0d)

## Dec 3th 2024
- Wrote scraper script to get data from UMass Course Description website [link to commit](https://github.com/kitanome/course-dependency-chart/commit/81442720834ba08376b055237be5b9e489110a98)

## Dec 5th 2024
- First iteration of formatting scraped data + Attempt to generate graph from that data [link](https://github.com/kitanome/course-dependency-chart/commit/c7797a5a7ff910162471a9c54cf259a1a49d2749)
 Note : API Data is lacking instructor attribute, and containing many outdated courses
    - TODO: Merge with scraped data
- Added files to initialize database on server side, as well as User and Course Models [link](https://github.com/kitanome/course-dependency-chart/commit/7789116f19db5da8316580e744f7e0f8d3c42427)


## Dec 9th 2024
- Merged the data from API and scraper into one consistent source, stored in the backend in `uptodate_courses_s25_only.json` [link](https://github.com/kitanome/course-dependency-chart/commit/03a84f9b4e31d652ac4fac054840e145caeab956)
- Imported Course data into SQLite Database, added `loadData.js` script to reset database [link to PR with details](https://github.com/kitanome/course-dependency-chart/pull/61)
- Routed the backend to fetch course data from database [link](https://github.com/kitanome/course-dependency-chart/commit/265f5f0aa664b492058d9c0f5fde0b2f81978e5f)
- Fix to GraphComponent to be compatible with courses fetched from database instead of old sample placeholder JSON [link](https://github.com/kitanome/course-dependency-chart/commit/9941730d41b2225b240c7813289c6d5222245399) -
[link to PR with details](https://github.com/kitanome/course-dependency-chart/pull/63)
- Fix to SidebarComponent to be compatible with new data [link](https://github.com/kitanome/course-dependency-chart/commit/72c8e4e68ee9b71c388f07402b4a47cbb6658dbf) - [link to PR with details](https://github.com/kitanome/course-dependency-chart/pull/64)
- Major fix to front-end graph display to wrap text in each node + CSS styling to be more pleasing [link](https://github.com/kitanome/course-dependency-chart/commit/ec4bdcb6510ce263b32e77d1d18945cb840db9df)
- Made Graph start at the beginning course CICS 110 [link](https://github.com/kitanome/course-dependency-chart/pull/66/commits/7a82a97037971cdb2e04790326bb7b35063e18da)
- Implemented Comments feature [link to PR with details](https://github.com/kitanome/course-dependency-chart/pull/68)


## Dec 10th 2024
- GraphComponent fix for better user experience
 [link to commit](https://github.com/kitanome/course-dependency-chart/commit/7a82a97037971cdb2e04790326bb7b35063e18da)
- Updated README.md for detailed instructions and feature description
