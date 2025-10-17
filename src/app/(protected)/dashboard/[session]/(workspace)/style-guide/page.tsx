import ThemeContent from "@/components/style/theme";
import { TabsContent } from "@/components/ui/tabs";
import { MoodBoardImagesQuery, StyleGuideQuery } from "@/convex/query.config";
import { MoodBoardImage } from "@/hooks/use-styles";
import { StyleGuide } from "@/redux/api/style-guide";
import { Palette } from "lucide-react";
import React from "react";
import { mockColorGuide, mockTypographyGuide } from "./mockData";
import StyleGuideTypography from "@/components/style/typography";
import MoodBoard from "@/components/style/mood-board";

type Props = {
  searchParams: Promise<{ project: string }>;
};

const StyleGuide = async ({ searchParams }: Props) => {
  const projectId = (await searchParams).project;

  const existingStyleGuide = await StyleGuideQuery(projectId);

  const guide = existingStyleGuide.styleGuide
    ?._valueJSON as unknown as StyleGuide;

  const colorGuide = guide?.colorSections || [];

  const typographyGuide = guide?.typographySections || [];

  const existingMoodboardImages = await MoodBoardImagesQuery(projectId);

  const guideImages = existingMoodboardImages.images
    ._valueJSON as unknown as MoodBoardImage[];

  return (
    <div>
      <TabsContent value="colours" className="space-y-8">
        {!guideImages.length ? (
          <div className="space-y-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Palette className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No colors generated yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Upload images to your mood baord and generate an AI-powered
                style guide with colors and typography.
              </p>
            </div>
          </div>
        ) : (
          <ThemeContent colorGuide={colorGuide} />
          // <ThemeContent colorGuide={mockColorGuide} />
        )}
      </TabsContent>

      <TabsContent value="typography" className="space-y-8">
        <StyleGuideTypography typographyGuide={typographyGuide} />
        {/* TODO : Font is not changing as per need. */}

        {/* <StyleGuideTypography typographyGuide={mockTypographyGuide} /> */}
        {/* TIMESTAMP : 3:54:00 */}
      </TabsContent>

      <TabsContent value="moodboard" className="space-y-8">
        <MoodBoard guideImages={guideImages} />
      </TabsContent>
    </div>
  );
};

export default StyleGuide;
