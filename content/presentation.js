export default {
    title: "Présentation",
    pages: [
        `<h2>Présentation du projet</h2>
        <p>Mnemosym est une bibliothèque numérique du domaine public limitée à 1000 œuvres littéraires.</p>
        <p>Les oeuvres sont ajoutées progressivement par la communauté grâce à un système de contribution appelé fragment. Les membres peuvent collecter des fragments en participant à la vie du site et les déposer pour les livres de leur choix. </p>
        <p>Une fois qu’un livre atteint le nombre de fragments requis, il intègre définitivement la bibliothèque et devient accessible pour tous les lecteurs.</p>
        <p>Le site est gratuit et en libre accès pour la lecture.</p>
        <p>Si une version définitive voit le jour, un système d'abonnement annuel (10 € par an) est envisagé pour participer à la construction de la bibliothèque (plus d'informations à la page 4).</p>
       `,

        `<h2>Pourquoi 1000 livres ?</h2>
         <p>La bibliothèque est volontairement limitée à 1 000 livres pour deux raisons :</p>
         <ul>
            <li>Technique : la gestion du site sera simplifiée par le nombre limité d’oeuvres, la base de données sera plus facile à maintenir et les efforts pourront être concentrés sur le confort utilisateur et l’animation du site.</li>
            <li>Symbolique : cette limite contribue à fédérer une communauté autour d’un objectif commun qui est de remplir la bibliothèque.</li>
         </ul>

        <p>Cette limite entraîne les implications suivantes :</p>
        <ul>
            <li>Un livre ajouté ne sera jamais retiré,</li>
            <li>Un fragment attribué à un livre l’est de manière irréversible,</li>
            <li>Une fois la bibliothèque remplie, plus aucun livre ne pourra entrer et plus aucun utilisateur ne pourra contribuer à sa construction.</li>
        </ul>
        <p>Ainsi, chaque contribution compte et chaque choix est décisif.</p>
        `,
        `<h2>Les Fragments</h2>
        <p>Les fragments représentent la contribution des membres à la construction de la bibliothèque.</p>
        <p>Le système a été pensé pour que les premières oeuvres soient faciles à ajouter, le temps que la communauté grandisse, ensuite il sera de plus en plus difficile d’ajouter un nouveau livre.</p>
        <p>À titre d’exemple, voici des ordres de grandeur du nombre de fragments requis à différents paliers symboliques:</p>
        <ul>
            <li>1er livre : 1 fragment</li>
            <li>100e livre : 100 fragments</li>
            <li>200e livre : 280 fragments</li>
            <li>500e livre : 6 000 fragments</li>
            <li>700e livre : 46 000 fragments</li>
            <li>900e livre : 360 000 fragments</li>
            <li>1000e livre: 1 000 000 fragments</li>
        </ul>
        <p>La progression est linéaire au tout début, puis devient rapidement exponentielle, chaque centaine de livres demande près de 3 fois plus de fragments que la précédente.</p>
        <p>Au total, le nombre de fragments nécessaires pour remplir la bibliothèque est au minimum de <strong>98 millions</strong>. Ce chiffre ne tient pas compte des fragments non utilisés, ou des livres qui n’atteindront pas le nombre requis pour rejoindre la bibliothèque.</p>
        `,
        `<h2>Obtention des fragments</h2>
        <p>Dans cette version "test" du site les utilisateurs peuvent collecter des fragments librement afin de participer à l'expérimentation du projet.</p>
        <p>Si une version définitive voit le jour un système d'abonnement annuel de 10 € est envisagé pour pouvoir collecter des fragments</p>
        <p>Ce choix repose sur deux raisons principales :</p>
        <ul>
            <li>Assurer le financement du site : base de données, hébergement et développement. A terme, si des excédents sont dégagés, ils serviront à renforcer l’animation du site.</li>
            <li>Limiter les dérives : sans système d’abonnement, un utilisateur pourrait créer plusieurs comptes afin d’obtenir des fragments, ce qui fausserait le principe de construction collective. L’abonnement permet d’associer un compte à un utilisateur réel et préserve ainsi le processus de sélection des oeuvres</li>
        </ul>
        <p>Un fragment est offert à un utilisateur lors de sa souscription, par la suite, les fragments s’obtiennent en participant à la vie du site.</p>`,
        `<h2>Premiers modes de collecte</h2>
        <p>Au départ, les méthodes de collecte sont :</p>
        <ul>
            <li>Publier une critique sur une oeuvre : +1 fragment par critique de plus de 1 200 caractères (chiffre révisable), dans la limite d’un fragment par oeuvre.</li>
            <li>Récompenses individuelles et collectives, lors de l’atteinte de paliers symboliques.</li>
        </ul>
        <p>A mesure que la bibliothèque se remplira, de nouvelles méthodes de collecte seront débloquées, afin de permettre à la communauté de progresser malgré la difficulté croissante du remplissage.</p>
        <p>Chaque moyen d’obtention de fragments est régi par ses propres règles.</p>`,
        `<h2>Publication d’une critique</h2>
        <p>Chaque critique de plus de 1 200 caractères (chiffre révisable) permettra de débloquer 1 fragment, dans la limite d’un fragment par oeuvre.</p>
        <p>Ces critères d’obtention ont pour but d’encourager la construction d’une critique développée et personnelle. La collecte des fragments ne doit pas être considérée comme un exercice de rapidité, mais comme une preuve qui valorise l’implication des membres dans la construction de la bibliothèque.</p>
        <p><strong>Chaque commentaire ayant permis de générer un fragment ne pourra pas être supprimé</strong>, il fera partie des archives de la construction de la bibliothèque. Il pourra cependant être modifié si l’utilisateur souhaite l’enrichir.</p>
        <p>Cette section se veut être un lieu d’échange entre membres de la communauté et une porte d’entrée à la lecture d’une oeuvre.<p>Enfin, la rédaction d’une critique n’est pas un exercice académique, elle encourage simplement le lecteur à partager ses impressions sur une oeuvre.</p>`,
        `<h2>Récompenses</h2>
        <p>Afin d’encourager la communauté à persévérer, des récompenses individuelles et collectives seront attribuées au fur et à mesure du remplissage de la bibliothèque et/ou de l’implication des membres lors du passage de paliers symboliques.</p>
        <p>Par exemple:</p>
        <ul>
            <li>Un utilisateur obtiendra un fragment tous les 10 fragments déposés.</li>
            <li>A chaque centaine de livre ajouté, tous les membres de la communauté obtiendront un fragment et une nouvelle méthode de collecte sera débloquée</li>
        </ul>`,
        `<h2>Votre rôle</h2>
        <p>Mnemosym est actuellement en phase de développement. <strong>Vous avez accès à la version test dans laquelle vous êtes libre d’interagir comme bon vous semble</strong>. Comme il s’agit d’un prototype, vous rencontrerez encore beaucoup de fonctionnalités manquantes, d’imperfections et de bugs, qui seront amenés à être corrigés au fil du temps. N’hésitez pas à nous les indiquer, ainsi que toutes suggestions que vous pourriez avoir dans le formulaire ci-joint. Vos retours ont un réel impact sur le développement du site.</p>
        <p>Points importants à garder en tête :</p>
        <ul>
            <li>Durant cette phase, certains livres qui ont intégré la bibliothèque pourront disparaître, ce qui est normal. Nous faisons des tests pour voir si nos fonctionnalités donnent les résultats attendus.</li>
            <li> Vous pouvez commenter les oeuvres pour obtenir des fragments, mais si toutefois vous souhaitez conserver vos commentaires pour la version finale du site, <strong>veillez à bien les sauvegarder dans un fichier externe.</strong> Lors du lancement officiel l’intégralité de la base de données sera réinitialisée : les livres, les commentaires et les comptes utilisateurs seront supprimés.</li>
        </ul>
        <p><strong>Durant cette phase, votre objectif n’est pas de remplir la bibliothèque, mais de participer à la construction du projet.</strong></p>
        <p>La date de lancement prévue est courant 2026.</p>
        `,
        `<h2>La distinction de "Précurseur"</h2>
        <p>Les utilisateurs ayant participé à la phase de développement obtiendront la distinction symbolique de "Précurseur". Cette reconnaissance est définitive et ne pourra plus être obtenue une fois le site lancé. Elle a pour objectif de valoriser les membres ayant contribué à la construction des fondations du site.</p>
        <p>Pour l’obtenir il faudra :</p>
        <ul>
            <li>Créer un compte utilisateur sur la version test.</li>
            <li>Remplir le formulaire de contribution dans la page du projet.</li>
            <li>S’inscrire sur la version finale avec la même adresse mail.</li>
        </ul>
        `, 
        `<h2>Contact</h2>
        <p>N'hésitez pas à nous indiquer toutes suggestions ou remarques que vous pourriez avoir concernant ce projet, via le formulaire ci-joint (disponible après inscription), ou l'adresse mail : <a href="mailto:contact@mnemosym.com">contact@mnemosym.com</a></p>`
    ]
}