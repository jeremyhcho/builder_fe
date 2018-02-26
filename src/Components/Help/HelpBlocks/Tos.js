import React from 'react'

// CSS
import './HelpBlock.scss'

const Tos = () => {
  return (
    /* eslint-disable max-len */
    <main styleName="help-block-1">
      <header>
        Terms of service
      </header>

      <section styleName="sub-section">
        <p styleName="sub-header">1. Introduction</p>
        <p styleName="description">
          These Website Standard Terms and Conditions written on this webpage shall manage your use of this website. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
        </p>
        <p styleName="description">
          Minors or people below 18 years old are not allowed to use this Website.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">2. Intellectual Property Rights</p>
        <p styleName="description">
          Other than the content you own, under these Terms, Quartz Insights LLC and/or its licensors own all the intellectual property rights and materials contained in this Website.
        </p>
        <p styleName="description">
          You are granted limited license only for purposes of viewing the material contained on this Website.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">3. Restrictions</p>
        <p styleName="description">
          You are specifically restricted from all of the following:
        </p>

        <ul>
          {
            [
              'publishing any Website material in any other media',
              'selling, sublicensing and/or otherwise commercializing any Website material',
              'publicly performing and/or showing any Website material',
              'using this Website in any way that is or may be damaging to this Website',
              'using this Website in any way that impacts user access to this Website',
              'using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity',
              'engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website'
            ].map(restriction => (
              <li key={restriction}>
                {restriction}
              </li>
            ))
          }
        </ul>

        <p styleName="description">
          Certain areas of this Website are restricted from being access by you and Quartz Insights LLC may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">4. Your content</p>
        <p styleName="description">
          In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Quartz Insights LLC a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
        </p>
        <p styleName="description">
          Your Content must be your own and must not be invading any third-party’s rights. Quartz Insights LLC reserves the right to remove any of Your Content from this Website at any time without notice.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">5. Disclaimer</p>
        <p styleName="description">
          The materials on Quartz Insights LLC's website are provided on an 'as is' basis. Quartz Insights LLC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p styleName="description">
          Further, Quartz Insights LLC does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">6. Limitations</p>
        <p styleName="description">
          In no event shall Quartz Insights LLC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Quartz Insights LLC's website, even if Quartz Insights LLC or a Quartz Insights LLC authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">7. Accuracy of Materials</p>
        <p styleName="description">
          The materials appearing on Quartz Insights LLC website could include technical, typographical, or photographic errors. Quartz Insights LLC does not warrant that any of the materials on its website are accurate, complete or current. Quartz Insights LLC may make changes to the materials contained on its website at any time without notice. However Quartz Insights LLC does not make any commitment to update the materials.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">8. Limitation of Liability</p>
        <p styleName="description">
          In no event shall Quartz Insights LLC, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Quartz Insights LLC, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">9. Indemnification</p>
        <p styleName="description">
          You hereby indemnify to the fullest extent Quartz Insights LLC from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">10. Severability</p>
        <p styleName="description">
          If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">11. Variation of Terms</p>
        <p styleName="description">
          Quartz Insights LLC is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">12. Assignment</p>
        <p styleName="description">
          The Quartz Insights LLC is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">13. Entire Agreement</p>
        <p styleName="description">
          These Terms constitute the entire agreement between Quartz Insights LLC and you in relation to your use of this Website, and supersede all prior agreements and understandings.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="sub-header">14. Assignment</p>
        <p styleName="description">
          These Terms will be governed by and interpreted in accordance with the laws of the State of California, and you submit to the non-exclusive jurisdiction of the state and federal courts located in California for the resolution of any disputes.
        </p>
      </section>

      <section styleName="sub-section">
        <p styleName="footer">
          This Terms of Use policy was last updated on February 17th, 2018.
        </p>
      </section>
    </main>
    /* eslint-enable max-len */
  )
}

export default Tos
