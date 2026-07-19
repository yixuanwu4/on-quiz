# On quiz case study

This repository contains the case study for my application at On.

## Next Steps

- A proper release management with versioning and a changelog.
- Upgrade to Typescript 7 when Vuejs is compatible with it.
- On is a very international brand. I would make the quiz multilingual and add a language switcher to the application.
- On has probably a ready-made design system. I would use it to make the application more consistent with the brand and to improve the user experience.

## Bonus

I've added the following bonus features to the case study:

- Responsive layout for mobile and desktop devices.
- Custom font: I think the font used in the mockups is "Archer", but it's proprietary and not free to use. I used "Sanchez" instead, which is a free and open-source font that has a similar style to "Archer".
- Persistent state: The application saves the user's answers in the local storage, so that if the user refreshes the page or closes the browser, their progress is not lost.

## Feedback to the Case Study

- Remove `Start Screen.jpg`, `Results.jpg`, `Question.jpg` and `Loading Results.jpg` from assets as they are duplicates of the images in the `layout` folder.
- Instead of empty string for `nextQuestion` in the `Answer` type, use `null` to indicate that there is no next question. This will make it clearer that the absence of a next question is intentional and not an oversight. Furthermore, it will simplify the logic in the code that handles the `nextQuestion` property, as it will be easier to check for `null` than for an empty string.
- Only the answers of the first question have an `id` property. All answers should have an `id` property to ensure consistency and to facilitate the identification of answers in the code.
- Include the brand logo into the assets folder. I've copied the SVG from the website.

## Resources

- Original description: https://github.com/onrunning/frontend-eng-challenge
- Github Workflow Starters: https://github.com/actions/starter-workflows
