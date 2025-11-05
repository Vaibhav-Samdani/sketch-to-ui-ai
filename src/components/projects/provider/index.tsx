"use client";
import { loadProject } from "@/redux/slice/shapes";
import { restoreViewport } from "@/redux/slice/viewport";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  initialProjects: any;
};

const ProjectProvider = ({ children, initialProjects }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialProjects?._valueJSON?.sketchesData) {
      const projectsData = initialProjects._valueJSON;
      dispatch(loadProject(projectsData.sketchesData));

      if (projectsData.viewportData) {
        dispatch(restoreViewport(projectsData.viewportData));
      }
    }
  }, [dispatch, initialProjects]);
  return <>{children}</>;
};

export default ProjectProvider;
