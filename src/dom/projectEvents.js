export function setupProjectEvents(manager, renderCallback) {
  function handleDeleteProject(project) {
    const confirmed = confirm(
      `¿Estás seguro de que quieres eliminar el proyecto "${project.name}"? Esta acción no se puede deshacer.`
    );

    if (confirmed) {
      const success = manager.deleteProjectById(project.id);
      if (success) {
        renderCallback(manager.getCurrentProject());
      }
    }
  }

  function handleEditProject(project) {
    console.log('Edit project:', project.name);
  }

  return {
    handleDeleteProject,
    handleEditProject,
  };
}
