import React from 'react'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { ContentContainer } from '../../../styles/GlobalStyling'
import image from '../../../images/formel.png'

const Erklärung: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Erklärung'>
          <h3>Erfolgswert</h3>

          Der Erfolgswert eines Videos auf YouLys dient als Maßeinheit zur numerischen Beschreibung des Erfolgs eines
          Videos im Kontext des Gesamterfolgs des betreffenden YouTube Kanals. Dazu werden die Aufrufe, Kommentarzahl
          und Likes des Videos in Relation zu den Durchschnittswerten des jeweiligen Kanals gestellt und vergleichen
          damit die Performance des Videos mit der durchschnittlichen Performance des Kanals. Die Formel beschreibt
          also insbesonders das Wachstum eines Kanals.<br /><br />

          Konkret berechnet sich der Erfolgswert dabei nach folgender Formel:<br />

          <img src={image} style={{ marginTop: 15, marginBottom: 15 }} /><br />

          Die drei Summanden der Formel vergleichen jeweils die durchschnittliche Anzahl der Aufrufe, der Kommentare und
          der Likes mit den aktuellen Werten des Videos. Der Medianwert berechnet sich hier jeweils aus den Werten des
          Vortages der 50 vorhergehenden Videos, da zum Zeitpunkt der Berechnung nicht sichergestellt werden kann, ob
          am aktuellen Tag bereits Statistiken für das vorhergehende Video abgerufen wurden. Zur Berechnung wurde hier
          der Median statt des Durchschnitts gewählt damit einzelne Ausreißer in den vorhergehenden Videos nicht in die
          Berechnung des Erfolgswerts einzubeziehen. Würde man hier den Durchschnitt wählen und ein einzelnes Video
          eines Kanals wäre überdurchschnittlich erfolgreich, so würde der Erfolgswert aller kommenden Videos um ein
          vielfaches niedriger. Durch den Quotient aus den drei Werten mit dem Durchschnittswert ergibt sich für jeden
          der drei Werte ein vergleichbares Ergebnis. Ist der Wert des aktuellen Videos exakt durchschnittlich, so
          ergibt sich ein Quotient von 1, ist der Wert unterdurchschnittlich, fällt der Quotient zwischen 0 und 1,
          ist der Wert überdurchschnittlich, so steigt der Wert über 1. Die Formel wurde hier so gewählt, dass der
          Wert nach oben offen ist, ein virales Video ist dadurch leicht als solches identifizierbar. Die drei
          Quotienten werden anschließend addiert, wobei der Quotient der Aufrufe mit einem Faktor von 2 stärker
          in Betracht gezogen wird als die Kommentare und Likes. Somit ergibt sich für ein exakt durchschnittliches
          Video ein Erfolgswert von 4, für unterdurchschnittliche Videos ein Erfolgswert zwischen 0 und 4, sowie
          für überdurchschnittliche Videos ein Wert über 4.<br /><br />

          Der Erfolgswert eines Kanals berechnet sich dann jeweils aus dem Durchschnitt der Erfolgswerte der 50
          zuletzt hochgeladenen Videos.<br /><br />

          Der Erfolgswert kann anschließend in Relation zu den untersuchten Erfolgsfaktoren, wie beispielsweise den
          Emotionen der Gesichter auf Thumbnails, gesetzt und auf Korrelationen untersucht werden.

          <h3>Entwicklung und Source Code</h3>

          YouLys wurde entwickelt im Rahmen meiner (Markus Vogel) Bachelorarbeit an der TU Dresden, wird sich aber in
          Zukunft weiter entwickeln und (hoffentlich :D) verbessern. Der Source Code ist Open Source und auf Github
          verfügbar und für jeden einsehbar unter: <a href='https://github.com/Wursteintopf/YouLys'>https://github.com/Wursteintopf/YouLys</a><br /><br />

          YouLys steht unter der GNU GPL v3.0 Lizenz, das heißt, ihr dürft den Code kopieren, weiterverwenden,
          weiterentwickeln und so weiter, jede Kopie, Weiterentwicklung etc muss jedoch erneut Open Source unter derselben
          Lizenz veröffentlicht werden. Die genauen Lizenzbestimmungen findet ihr hier: <a href='https://opensource.org/licenses/GPL-3.0'>https://opensource.org/licenses/GPL-3.0</a>

        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Erklärung
