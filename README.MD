# Mail Tracker

Bienvenue

Ce projet est un exemple simple de tracker d'ouverture d'e-mails à l'aide d'une image invisible.

## Fonctionnement

Un pixel de suivi est inséré dans le corps de l'e-mail. Lorsqu'un destinataire ouvre l'e-mail, l'image est chargée depuis le serveur, ce qui permet de détecter l'ouverture.

```html
<img src="https://tominoutrack.netlify.app/.netlify/functions/track?uid=test001" width="1" height="1" style="display:none;" />
```

## Exemple d'utilisation

```html
<html>
    <body>
        <p>Bonjour 👋,</p>
        <p>Ceci est un test du mail tracker.</p>
        <img src="https://tominoutrack.netlify.app/.netlify/functions/track?uid=test001" width="1" height="1" style="display:none;" />
    </body>
</html>
```

## Remarques

- Le paramètre `uid` permet d'identifier l'utilisateur ou l'e-mail.
- Ce projet est à but éducatif.

## Licence

MIT



