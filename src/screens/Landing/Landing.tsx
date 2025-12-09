/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { Body } from "@/screens/Landing/components";
import { PageContainer, LogoHeader, Footer } from "@/components";

export const LandingScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <LogoHeader />
      <Body />
      <Footer />
    </PageContainer>
  );
};
