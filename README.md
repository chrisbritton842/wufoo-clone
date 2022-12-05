# RareForm

RareForm is a "lite" clone of the website Wufoo by SurveyMonkey where users can create, edit, view, and share forms with friends and colleagues.

| [Live Site](https://rareform.herokuapp.com/) | [MVP Feature List](https://github.com/chrisbritton842/wufoo-clone/wiki/Feature-List) | [Database Schema](https://github.com/chrisbritton842/wufoo-clone/wiki/Database-Schema) | [User Stories](https://github.com/chrisbritton842/wufoo-clone/wiki/User-Stories) | [Wireframes](https://github.com/chrisbritton842/wufoo-clone/wiki/Wireframes) |

## Technologies Used

RareForm is built with a React / Redux frontend and a Python / Flask backend. The app uses a postgresql database and Alembic for its migrations. It is packaged in a docker virtual container and deployed via Heroku.

<img src="https://user-images.githubusercontent.com/81934894/167922066-3a466e42-731b-4bdf-98b4-8b9971991ad2.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167921070-fc1ea1c2-195e-4ff1-8256-876145615140.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167922439-3cfe1d9b-9c37-4b79-8abe-d3737c256dd1.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167922798-02cd9734-80bb-4aa2-bacf-7be7217ffbfc.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167923126-4e788245-c2be-41d9-82b6-7c5110c1b214.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167923547-eb7de355-676b-48ed-8d16-b3296475472d.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167939319-40ad331b-5718-4d67-a410-ed75adfffebd.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167939817-eedb63be-4b28-42ca-86ab-a09a1508807f.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167940488-b4fd2129-f1a2-4a3f-bc48-437e5c7e3315.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167940850-cd9b586d-7e4b-4a44-8665-c1aa80c6c348.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941258-11a0b456-b4f6-44ab-b984-7665ab3090f7.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941591-88b41548-0f6b-4d81-862e-624836326836.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941934-d8a97a26-1cfc-41d6-b997-10950331528e.svg" width="25" height="25">

## Getting started
### If you are a mac user using the M1 chip, please follow this setup guide:

1. Install the following containers: [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Open VS Code and Clone only this branch of the repository:
   ```bash
   git clone https://github.com/chrisbritton842/wufoo-clone.git 
   ``` 
4. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. This will take some time the first time but will be faster afterwords since much of the process will be cached!

5. Create a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running the app. 

6. Use the following commands to start your virtual environment (pipenv), migrate your database, seed your database, and run the flask app:

   ```bash
   pipenv shell
   ```
   
   ```bash
   flask db migrate
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, see the following [README](./react-app/README.md) inside the `react-app` directory.

<br>

### If NOT using the M1 chip, follow the steps below:

1. Open VS Code and clone only this branch of the repository:

   ```bash
   git clone https://github.com/chrisbritton842/wufoo-clone.git   ```

2. Install dependencies:

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Use the `.env.example` to create a `.env` in the root directory using the correct development environment settings.
 
4. Set up your PostgreSQL user, password and database according to your .env settings.

5. Use the following commands to start your virtual environment (pipenv), migrate your database, seed your database, and run the flask app:

   ```bash
   pipenv shell
   ```
   
   ```bash
   flask db migrate
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, see the following [README](./react-app/README.md) inside the `react-app` directory.


## Deployment to Heroku

### Follow these steps to deploy to Heroku:

1. Write your Dockerfile. This application is configured with Github Actions so that Github will automatically pull your code, package, and push it to Heroku. It will then release the new image and run db migrations. Please use the notes notes found in this [docker file](./Dockerfile) to code out the Docker File.

2. It is recommended that you append the following code to your YAML file in .github/workflows so that your seeder files will automatically update when pushing to the main branch:

      ```bash
      - name: Clear Seed Data
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: heroku run -a ${{ secrets.HEROKU_APP_NAME }} flask seed undo

      - name: Seed New Data
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: heroku run -a ${{ secrets.HEROKU_APP_NAME }} flask seed all
        ```
        
3. Make sure you have installed the Heroku Postgres add-on for the application in your Heroku account.

4. Configure the production environment variables in your Heroku app settings. Set a `DATABASE_URL` key to the autogenerated value from the Heroku Postgres add-on. Set a `SECRET_KEY` to a random string.

5. Go to your Github Actions Secrets at the following address: *github.com/userID/repoName/settings/secrets/actions*. Set the key, `HEROKU_API_KEY` to a Heroku Oauth Token. To get the Heroku Oauth Token, run the following command in your terminal already authenticated to the Heroku CLI and pull out the string on the Token key.

   ```bash
   heroku authorizations:create 
   ```
   
 Set the key, `HEROKU_APP_NAME` to the name of the app.
 
 ## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |

## Features Highlight
### Dynamic Form Creation
![2022-05-11 17 03 45](https://user-images.githubusercontent.com/81934894/167985381-c2b1f5b9-58e9-4bec-8b4e-06243dd79160.gif)
RareForm allows users to dynamically create, read, update, and delete form input elements in creating a new form with no need for page refreshes!

### Share Forms
![2022-05-11 20 40 04](https://user-images.githubusercontent.com/81934894/167987612-61c00489-ae46-4232-b2f3-4d60305720d6.gif)
When the user clicks "share" a unique url is generated which can be copied and distributed to friends and co-workers!

### View Form Data
![2022-05-11 20 47 15](https://user-images.githubusercontent.com/81934894/167988188-764351ee-5bc4-4a1b-8a16-d66bf9126940.gif)
Click the icon under "All Entries" to view entry data!

## Conclusion

With only a two week window for completion and without experience building a form-builder application, choosing this project was a risk, but a novel and exciting challenge. This was a chance to come up with my own theory of how to let users create their own forms, share them, and read data from them, and then test that theory. I needed to have a very clear picture in my mind of how all the pieces would fit together and be firmly confident that, in theory, the implementation would work. This required me to frontload research into possible datatypes for storing the user generated form inputs as well as plan how input labels and inputs would be related to each other, how state variables would be updated, and many other considerations. In the end, attentive and detailed planning carried this project to completion.
