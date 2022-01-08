import React from 'react'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { ContentContainer } from '../../../styles/GlobalStyling'

const Datenschutz: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Datenschutz'>
          <h3>1. Verantwortlicher, Personenbezogene Daten</h3>

          Verantwortlicher im Sinne von Art. 4, Ziffer 7 Datenschutzgrundverordnung („DSGVO“) für die Erhebung, Verarbeitung und Nutzung deiner personenbezogenen Daten ist:<br /><br />

          Markus Vogel<br />
          Hersbruckerstr. 42<br />
          90480 Nürnberg<br /><br />

          Per E-Mail: markus@vogelvlug.de<br /><br />

          -im Folgenden auch „wir“ oder „uns“ genannt-<br /><br />

          Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind (Art. 4, Ziffer 1 DSGVO).

          <h3>2. Datenerhebung, -verarbeitung und -nutzung</h3>

          Außer im Kontaktformular mit deiner ausdrücklingen Einwilligung erheben wir keine personenbezogenen Daten. Wirklich nicht.<br /><br />

          Darüber hinaus speichern wir zum Schutz unserer Systeme bei jedem Zugriff auf unsere Website und bei jedem Abruf einer Datei Zugriffsdaten in Form von Protokolldateien, die aus den folgenden Informationen bestehen:<br /><br />

          Deine dabei genutzte IP-Adresse,<br />
          Das Zugriffsdatum und -uhrzeit,<br />
          Die Information über den von dir genutzten Browser und dein Betriebssystem.<br />

          <h3>3. Cookies und deren Verwendung</h3>

          Cookies sind kleine Dateien, die es ermöglichen, auf dem Zugriffsgerät der Nutzer (PC, Smartphone o.ä.) spezifische, auf das Gerät bezogene Informationen zu speichern. Sie dienen der Benutzerfreundlichkeit von Webseiten und damit den Nutzern. Du kannst grundsätzlich den Einsatz der Cookies unterbinden, da die meisten Browser über eine Option verfügen, mit der das Setzen und Speichern von Cookies eingeschränkt oder komplett verhindert wird. Allerdings weisen wir darauf hin, dass die Nutzung und insbesondere der Nutzungskomfort unseres Angebots ohne Cookies eingeschränkt sein könnte.<br />

          <h3>4. Adobe Fonts</h3>

          Auf unserer Website verwenden wir Adobe Fonts. Adobe Fonts ist ein Dienst, der den Zugriff auf eine Schriftenbibliothek zur Verwendung in Desktop-Anwendungen und Websites ermöglicht. Genaueres hierzu gibt es in der Datenschutzerklärung von Adobe.<br />
          Wie verwendet der Dienst „Adobe Fonts“ für Websites Cookies?<br /><br />

          Im Zuge der Bereitstellung des Diensts „Adobe Fonts“ für Websites platziert oder verwendet Adobe keine Cookies auf Websites, um seine Schriften bereitzustellen.<br />
          Welche Informationen werden vom Dienst „Adobe Fonts“ für Websites erfasst?<br /><br />

          Zur Bereitstellung des Diensts „Adobe Fonts“ für Websites kann Adobe Informationen über die Schriften bzw. Schriftarten erfassen, die für unsere Website bereitgestellt werden. Die Informationen werden zur Abrechnung und Einhaltung von Vorschriften verwendet und können Folgendes umfassen:<br />

          <ul>
            <li>bereitgestellte Schriften</li>
            <li>ID des Webprojekts</li>
            <li>JavaScript-Version des Webprojekts (String)</li>
            <li>Art des Webprojekts (String „configurable“ oder „dynamic“)</li>
            <li>Einbettungstyp (ob Sie den JavaScript- oder CSS-Einbettungscode verwenden)</li>
            <li>Konto-ID (identifiziert den Kunden, von dem das Webprojekt stammt)</li>
            <li>Dienst, der die Schriftarten bereitstellt (z. B. Adobe Fonts)</li>
            <li>Server, der die Schriftarten bereitstellt (z. B. Server von Adobe Fonts oder Unternehmens-CDN)</li>
            <li>Hostname der Seite, auf der die Schriften geladen werden</li>
            <li>Die Zeit, die der Webbrowser zum Herunterladen der Schriften benötigt</li>
            <li>Die Zeit vom Herunterladen der Schriften mit dem Webbrowser bis zur Anwendung der Schriften</li>
            <li>Ob ein Werbeblocker installiert ist, um festzustellen, ob der Werbeblocker die korrekte Verfolgung der Seitenaufrufe beeinträchtigt</li>
            <li>Betriebssystem- und Browser-Version</li>
          </ul>

          <h3>5. Du hast die folgenden Rechte!</h3>

          Du hast das Recht,<br /><br />

          auf Antrag unentgeltlich Auskunft zu erhalten über die personenbezogenen Daten, die wir über dich gespeichert haben<br />
          zum Widerspruch gegen die Nutzung und/oder Übermittlung deiner Daten.<br />
          auf Berichtigung unrichtiger Daten, Sperrung und Löschung deiner personenbezogenen Daten, soweit dem keine gesetzliche Aufbewahrungspflicht entgegensteht.<br /><br />

          Diese Rechte kannst du jederzeit wahrnehmen, indem du uns unter den unter Ziffer 1 genannten Kontaktdaten kontaktierst.

        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Datenschutz
