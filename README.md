# HeNoBase

> # !! Achtung !!
>
> #### Aktuell befindet sich dieses Package in der Entwicklung und sollte daher noch nicht genutzt werden!
>
> ---

## First Start

Als erstes muss ein Account bei HeNoBase angelegt werden.
Nachdem Ihr das getan habt, könnt ihr ein Projekt erstellen.
Unter den Projekteinstellungen findet Ihr nun die `connectionURL` und den passenden `apiKey`.
Diese brauchen wir gleich.

## HeNoBaseConnection ( { config } )

Um HeNoBase nutzen zu können müssen wir als erstes eine config-Datei erstellen.
Die Datei sieht aus wie folgt:
![HeNoBase Config](https://github.com/HeNoMedia/henobase/blob/HEAD/readMe/img/henobase-config.png)
Unter `henobaseConfig` speichern wir unsere `connectionURL` und den `apiKey`
Wenn wir das getan haben, erstellen wir eine neue Instanz von `HeNoBaseConnection` und geben die Config mit.

Nun könnt ihr die von euch gewählten Module exportieren.

## Module

Aktuell haben wir 2 Module die Ihr nutzen könnt:

### auth()

Diese Modul ist zur Authentifizierung von Nutzer.

##### Verfügbare Funktionen

`register(username: string, password: string)`
Register user with username and password.
Returns a promise with true

`login(username: string, password: string)`
Login user with username and password.
Returns a promise with userData

`logout()`
Logout user

`updateUser(data: any)`
Update User with data
Return a promise with true

`requestPasswordReset(username: string)`
Request a Link to reset password
Returns a promise with true

`resetPasswordByToken(token: string, password: string)`
Reset the Password with token
Returns a promise with true

`deleteUser()`
Delete the user
Returns a promise with true

### db()
